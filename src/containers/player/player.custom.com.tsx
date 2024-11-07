// usePaginatedData.js
import { useState, useEffect, useCallback } from 'react';
import { filterContentdataSet } from '@/player/helper/playerUtility';
import { actSectionData } from '@/services/actions/content.action';
import { getAccessTokenObj } from '@/services/helpers/init.helper';

const usePaginatedData:any = (paginationPayload: any, initialPage = 1) => {
  const [mergeDatadata, setData] = useState<any>([]);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [payloadService, setPayloadService] = useState<any>({});

  
  const fetchData = async (pageNum: number) => {
    if (loading) return; // Prevent duplicate requests

    setLoading(true);
    setError(null);

    try {

        let refreshNewdata = payloadService;
        refreshNewdata.params.page = page;

        const response = await actSectionData(refreshNewdata, getAccessTokenObj());
        if (response && response.data) {

            let PRIMARYPLAYLIST: any = response.data.map((singleItem: any, n: number) => {
                return filterContentdataSet(singleItem, n)
            })

            // setData(prevData => [...prevData, ...PRIMARYPLAYLIST]);
            setData([...PRIMARYPLAYLIST])
        } else {
            setError('success');
        }


    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);


  const getactPlayload = useCallback((payload:any) => {
    setPayloadService(payload);
  }, []);

  return { mergeDatadata, loading, error, fetchData, setPage, setPayloadService, getactPlayload };
};

export default usePaginatedData;
