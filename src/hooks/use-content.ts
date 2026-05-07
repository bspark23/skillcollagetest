import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { fetchSiteContent } from '@/store/slices/content-slice';

export const useContent = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSiteContent());
  }, [dispatch]);
};
