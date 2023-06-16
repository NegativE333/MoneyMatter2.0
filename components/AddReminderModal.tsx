'use client';

import useReminderModal from "@/hooks/useAddReminderModal";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { toast } from "react-hot-toast";
import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";

const AddReminderModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const addReminderModal = useReminderModal();
    const { user } = useUser();
    const supabaseClient = useSupabaseClient();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            type: '',
            name: '',
            for: '',
            amount: '',
        }
    })

    const onChange = (open: boolean) => {
        if(!open){
            reset();
            addReminderModal.onClose();
        }
    }

    const onSumbit: SubmitHandler<FieldValues> = async (values) => {
        try{
            setIsLoading(true);

            if(!user){
                toast.error('Something went wrong.');
                return;
            }

            const{error: supabaseError} = await supabaseClient
                .from('reminder')
                .insert({
                    user_id: user.id,
                    type: values.type,
                    name: values.name,
                    for: values.for,
                    amount: values.amount
                })

                if(supabaseError){
                    setIsLoading(false);
                    return toast.error(supabaseError.message)
                }

                router.refresh();
                setIsLoading(false);
                toast.success('Reminder Added');
                reset();
                addReminderModal.onClose();
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
            title="Add Reminder"
            description=""
            isOpen={addReminderModal.isOpen}
            onChange={onChange}
        >
            <form
                onSubmit={handleSubmit(onSumbit)}
                className="flex flex-col gap-y-4"
            >
                <Input 
                    id="type"
                    disabled={isLoading}
                    {...register('type', { required: true})}
                    placeholder="Type"
                />
                <Input 
                    id="name"
                    disabled={isLoading}
                    {...register('name', {required: true})}
                    placeholder="Name"
                />
                <Input 
                    id="for"
                    disabled={isLoading}
                    {...register('for', {required: true})}
                    placeholder="For"
                />
                <Input 
                    id="amount"
                    disabled={isLoading}
                    {...register('amount', {required: true})}
                    placeholder="How much?"
                />
                <Button disabled={isLoading} type="submit">
                    Add
                </Button>
            </form>
        </Modal>
    )
}

export default AddReminderModal;