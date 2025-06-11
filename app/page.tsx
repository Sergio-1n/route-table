import RouteTable from '@/components/RouteTable';
import { routes } from '@/data/routes';

export default function RoutesPage() {
  return (
    <main className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Действующие маршруты IPv4</h1>
      <RouteTable routes={routes} />
    </main>
  );
}
