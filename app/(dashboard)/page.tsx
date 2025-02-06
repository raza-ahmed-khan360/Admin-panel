import { client } from 'sanity/lib/client';
import { ProductsTable } from './products-table';

export default async function DashboardPage({
  searchParams
}: {
  searchParams: { offset?: string }
}) {
  const offset = searchParams.offset ? parseInt(searchParams.offset) : 0;
  const { products, totalProducts } = await client.fetch(`
    {
      "products": *[_type == "product"] | order(_createdAt desc) [$start...$end] {
        _id,
        name,
        "slug": slug.current,
        price,
        status,
        "totalSales": coalesce(totalSales, 0),
        _createdAt,
        "imageUrl": image.asset->url
      },
      "totalProducts": count(*[_type == "product"])
    }
  `, { start: offset - 5, end: offset });

  return (
    <div className="container mx-auto py-10">
      <ProductsTable
        products={products}
        offset={offset}
        totalProducts={totalProducts}
      />
    </div>
  );
}
