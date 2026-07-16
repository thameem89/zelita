alter table public.products add column if not exists pdf_url text;

do $$
declare item record; candidate text; suffix integer;
begin
  for item in select id, name from public.products where slug is null or btrim(slug) = '' order by created_at, id loop
    candidate := trim(both '-' from regexp_replace(lower(item.name), '[^a-z0-9]+', '-', 'g'));
    if candidate = '' then candidate := 'product'; end if;
    suffix := 2;
    while exists(select 1 from public.products where slug = candidate and id <> item.id) loop
      candidate := regexp_replace(candidate, '-[0-9]+$', '');
      candidate := candidate || '-' || suffix;
      suffix := suffix + 1;
    end loop;
    update public.products set slug = candidate where id = item.id;
  end loop;
end $$;

alter table public.products alter column slug set not null;
create unique index if not exists products_slug_unique_idx on public.products (slug);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('product-pdfs', 'product-pdfs', true, 10485760, array['application/pdf'])
on conflict (id) do update set file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Authenticated admins upload product PDFs" on storage.objects;
create policy "Authenticated admins upload product PDFs" on storage.objects for insert to authenticated
with check (bucket_id = 'product-pdfs' and storage.extension(name) = 'pdf');

drop policy if exists "Authenticated admins replace product PDFs" on storage.objects;
create policy "Authenticated admins replace product PDFs" on storage.objects for update to authenticated
using (bucket_id = 'product-pdfs') with check (bucket_id = 'product-pdfs' and storage.extension(name) = 'pdf');

drop policy if exists "Authenticated admins delete product PDFs" on storage.objects;
create policy "Authenticated admins delete product PDFs" on storage.objects for delete to authenticated
using (bucket_id = 'product-pdfs');
