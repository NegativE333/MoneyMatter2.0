'use client';

import useDeleteExpModal from "@/hooks/useDeleteExpModal";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { toast } from "react-hot-toast";
import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";

const DeleteExpModal = () => {
    const deleteExpModal = useDeleteExpModal();
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useUser();
    const supabaseClient = useSupabaseClient();
    const router = useRouter();

    const onChange = (open: boolean) => {
        if(!open){
            deleteExpModal.onClose();
        }
    }

    const handleDelete = async () => {
        const {
            data: expData,
            error: expError
        } = await supabaseClient
            .from('expense')
            .select('amount')
            .eq('id', deleteExpModal.expenseId)
            .single()

        const{
            data: moneyData,
            error: moneyError
        } = await supabaseClient
            .from('users')
            .select('avail')
            .eq('id', user?.id)
                
            // @ts-ignore: Object is possibly 'null'
        const objToString = JSON.stringify(moneyData[0].avail);
        const stringToInt = parseInt(objToString);
        const add = stringToInt + expData?.amount;
        
        const {
            error: supabaseError
        } = await supabaseClient
            .from('users')
            .update({ avail: add })
            .eq('id', user?.id);

        if(supabaseError){
            return toast.error(supabaseError.message);
        }

        const { error } = await supabaseClient
            .from('expense')
            .delete()
            .eq('id', deleteExpModal.expenseId)

        if(error){
            toast.error('Something went wrong.');
        }
        else{
            toast.success('Expense deleted.');
        }
        router.refresh();
        deleteExpModal.onClose();
    }

    return(
        <Modal
            title="Delete expense"
            description=''
            isOpen={deleteExpModal.isOpen}
            onChange={onChange}
        >   
        <div className="flex items-center justify-center">
            <Button 
                onClick={handleDelete}
                className="mr-2"
            > 
                Delete
            </Button>
            <Button 
                onClick={deleteExpModal.onClose}
                className="ml-2"
            >
                Cancle
            </Button>
        </div>
        </Modal>
    )
}

export default DeleteExpModal;