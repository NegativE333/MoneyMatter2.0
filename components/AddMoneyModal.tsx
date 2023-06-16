'use client';

import useAddMoneyModal from "@/hooks/useAddMoneyModal";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { toast } from "react-hot-toast";
import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";

const AddMoneyModal = () => {
    const addMoneyModal = useAddMoneyModal();
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useUser();
    const supabaseClient = useSupabaseClient();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            amount: ''
        }
    })

    const onChange = (open: boolean) => {
        if(!open){
            reset();
            addMoneyModal.onClose();
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try{
            setIsLoading(true);

            if(!user){
                toast.error('Something went wrong.');
                return;
            }

            const{
                data: moneyData,
                error: moneyError
            } = await supabaseClient
                .from('users')
                .select('avail')
                .eq('id', user.id)
                
            // @ts-ignore: Object is possibly 'null'
            const objToString = JSON.stringify(moneyData[0].avail);
            const stringToInt = parseInt(objToString);
            const add = stringToInt + parseInt(values.amount);

            const {
                error: supabaseError
            } = await supabaseClient
                .from('users')
                .update({ avail: add })
                .eq('id', user.id);

                if(supabaseError){
                    setIsLoading(false);
                    return toast.error(supabaseError.message);
                }
    
                router.refresh();
                setIsLoading(false);
                toast.success('Money added.');
                reset();
                addMoneyModal.onClose();
        }
        catch(error){
            toast.error('Something went wrong.');
        }
        finally{
            setIsLoading(false);
        }
    }

    return(
        <Modal
            title="Add Money"
            description=""
            isOpen={addMoneyModal.isOpen}
            onChange={onChange}
        >
            <form 
                className="flex flex-col gap-y-4"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Input 
                    id="amount"
                    disabled={isLoading}
                    {...register('amount', {required: true})}
                    placeholder="Add Money"
                />
                <Button disabled={isLoading} type="submit">
                    Add
                </Button>
            </form>
        </Modal>
    )
}

export default AddMoneyModal;