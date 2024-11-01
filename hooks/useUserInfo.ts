import { useGetUserInfoQuery } from '@/store/services'
import useVerify from './useVerify'
import { useAppDispatch } from './useRedux'
import { userLogin } from '@/store'
import { User } from '@/types';

interface UseUserInfoResult {
  userInfo: User | undefined;
  isVerify: boolean;
  isLoading: boolean;
  error: any; // Replace 'any' with the actual type of your error
  isError: boolean;
}

export default function useUserInfo(): UseUserInfoResult {
  const dispatch = useAppDispatch()
  const isVerify = useVerify()

  const { data, isLoading, error, isError } = useGetUserInfoQuery(undefined, {
    skip: !isVerify,
  })

  if (isError) dispatch(userLogin(''))

  return { userInfo: data?.data, isVerify, isLoading, error, isError }
}
