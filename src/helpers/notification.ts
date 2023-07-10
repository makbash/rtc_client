import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

type IErrType = 'string' | 'stock' | 'axios';

const getObjectType = (error: Error | AxiosError): IErrType => {
    return !error?.name ? 'string' : (error.name === 'AxiosError' ? 'axios' : 'stock');
}

const notification = {
    onSuccess: (text: string) => toast.success(text),
    onError: (error: any): void => {
        console.log(`ERR_TYPE:${getObjectType(error)}`);

        switch (getObjectType(error)) {
            case 'string':
                toast.error(error)
                break;

            case 'stock':
                toast.error(error.message)
                break;

            case 'axios':
                if (error.code === 'ERR_NETWORK') {
                    toast.error(error?.message);
                    break;
                }

                toast.error(error?.response?.data?.message);
                [...(error?.response?.data?.errors || [])].forEach((el: any) => toast.error(el.message));
                break;

            default:
                toast.error('Unknown error occurred');
                break;
        }
    }
}

export default notification;