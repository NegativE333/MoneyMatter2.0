'use client';

import useAddExpModal from "@/hooks/useAddExpModal";
import Modal from "./Modal";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { toast } from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

const AddExpModal = () => {
    const addExpModal = useAddExpModal();
    const [isLoading, setIsLoading] = useState(false); 
    const {user} = useUser();
    const supabaseClient = useSupabaseClient();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            title: '',
            amount: '',
        }
    })

    const onChange = (open: boolean) => {
        if(!open){
            reset();
            addExpModal.onClose();
        }
    } 

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try{
            setIsLoading(true);

            if(!user){
                toast.error('Something went wrong.');
                return;
            }

            const { 
                error: supabaseError
            } = await supabaseClient
                .from('expense')
                .insert({
                    user_id: user.id,
                    title: values.title,
                    amount: values.amount,
                })
            
            const {
                data: moneyFetchData,
                error: moneyFetchError
            } = await supabaseClient
                .from('users')
                .select('avail')
                .eq('id', user.id)

            // @ts-ignore: Object is possibly 'null'
            const objToString = JSON.stringify(moneyFetchData[0].avail);
            const stringToInt = parseInt(objToString);
            const sub = stringToInt - parseInt(values.amount);
            
            const {
                error: moneyUpdateError
            } = await supabaseClient
                .from('users')
                .update({ avail: sub})
                .eq('id', user.id)
            
            if(supabaseError){
                setIsLoading(false);
                return toast.error(supabaseError.message);
            }

            router.refresh();
            setIsLoading(false);
            toast.success('Expense Add');
            reset();
            addExpModal.onClose();
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
            title="Add your Expense"
            description=""
            isOpen={addExpModal.isOpen}
            onChange={onChange}
        >
            <form 
                className="flex flex-col gap-y-4"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Input 
                    id='title'
                    disabled={isLoading}
                    {...register('title', { required: true })}
                    placeholder='Expense title'
                />
                <Input 
                    id='amount'
                    disabled={isLoading}
                    {...register('amount', { required: true })}
                    placeholder='Amount'
                />
                <Button disabled={isLoading} type="submit">Add</Button>
            </form>
        </Modal>
    )
}

export default AddExpModal;