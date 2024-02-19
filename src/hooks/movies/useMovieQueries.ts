
import { defaultMovieQuery } from '@/constants';
import { MovieSort } from '@/model';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent } from 'react';

export default function useQueries(){

  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const activeSort = searchParams.get('sort') as MovieSort || defaultMovieQuery.sort;
  const params = new URLSearchParams(searchParams); 

  const setOrder = (e: ChangeEvent<HTMLSelectElement>) => {
    params.set('order', e.target.value);
    const url = `${pathName}?${params.toString()}`;
    router.push(url);
  }
  const setSort = (sort: MovieSort) => {
    params.set('sort', sort);
    const url = `${pathName}?${params.toString()}`;
    router.push(url);
  }
  const setIdGen = (idGenero: number) => {
    params.set('idgen', idGenero.toString());
    const url = `${pathName}?${params.toString()}`;
    router.push(url);
  }

  return {
    activeSort,
    setSort,
    setOrder,
    setIdGen,
  }
}