import { OperatorService } from '@/services/operator/operator.service';
import { ResponseGetProfile } from '@/services/operator/operator.type';
import { useCallback, useEffect, useState } from 'react';

export const useOperator = (token: string | null) => {
  const [data, setData] = useState<ResponseGetProfile | null>(null);
  const [loading, setloading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchGetProfile = useCallback(async () => {
    if (!token) return;
    setloading(true);
    setIsError(false);

    try {
      const res = await OperatorService.getProfile(token);
      if (!res) {
        setData(null);
        setIsError(true);
        return;
      }

      setData(res);
    } catch (error) {
      setIsError(!!error);
    } finally {
      setloading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchGetProfile()
  },[])


  return { data, loading, isError, fetchGetProfile }
};
