import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProver';
import { useQuery } from '@tanstack/react-query';

const useCarts = () => {
    const { user } = useContext(AuthContext);

    const { refetch, data : carts = [],} = useQuery({
        queryKey: ['carts', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://school-hunt.vercel.app/carts?email=${user?.email}`,{
                headers: {
                    authorization : `Bearer ${localStorage.getItem('access-token')}`
                }
            })
            return res.json();
        }
    })
    return [carts, refetch ]
};

export default useCarts;