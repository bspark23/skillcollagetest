import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchSiteContent } from '@/store/slices/content-slice';

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const useContent = () => {
  const dispatch = useAppDispatch();
  const { content, loading, lastFetched } = useAppSelector((state) => state.content);

  useEffect(() => {
    const now = Date.now();
    const isCacheValid = lastFetched && (now - lastFetched) < CACHE_DURATION;
    const hasContent = content.siteContent && Object.keys(content.siteContent).length > 0;
    
    // Only fetch if:
    // 1. No content exists
    // 2. Cache is expired
    // 3. Not currently loading
    if (!loading && (!hasContent || !isCacheValid)) {
      dispatch(fetchSiteContent());
    }
  }, []); // Empty deps - only run once on mount
};
