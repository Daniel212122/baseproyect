import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
import { notFound } from 'next/navigation' //Ahora que sabes que la factura no existe en tu base de datos, usemos notFoundpara manejarla. Navegue /dashboard/invoices/[id]/edit/page.tsxe importe { notFound }desde 'next/navigation'.
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Invoices',
};
export default async function Page({ params }: { params: { id: string} }){
  const id = params.id
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);
  if(!invoice){
    notFound(); //Luego, puedes usar un condicional para invocar notFoundsi la factura no existe:
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}