import { defaultIdGenero, defaultMovieQuery } from '@/constants';
import { MovieOrder, MovieSort } from '@/model';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent } from 'react';

type Params = MovieOrder | MovieSort | number;

export default function useQueries(){

  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const params = new URLSearchParams(searchParams); 

  const activeSort = searchParams.get('sort') as MovieSort || defaultMovieQuery.sort;
  const activeOrder = searchParams.get('order') as MovieOrder || defaultMovieQuery.order;

  const setOrder = (e: ChangeEvent<HTMLSelectElement>) => {
    const order = e.target.value as MovieOrder;
    setParams('order', order, defaultMovieQuery.order);
  }
  const setSort = (sort: MovieSort) => {
    setParams('sort', sort, defaultMovieQuery.sort);
  }
  const setIdGen = (idGenero: number) => {
    setParams('idgen', idGenero, defaultIdGenero);
  }

  const setParams = (key: string, val: Params, defVal: Params) => {
    if (val !== defVal) params.set(key, val.toString());
    else params.delete(key);
    const url = `${pathName}?${params.toString()}`;
    router.push(url);
  }

  return {
    activeSort,
    activeOrder,
    setSort,
    setOrder,
    setIdGen,
  }
}