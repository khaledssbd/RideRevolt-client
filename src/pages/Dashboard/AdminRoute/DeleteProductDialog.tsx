import cToast from '@/components/ReactHotToast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useDeleteProductMutation } from '@/redux/features/product/productApi';
import { RiDeleteBin6Line } from 'react-icons/ri';

interface DeleteProductDialogProps {
  productId: string;
}

const DeleteProductDialog = ({ productId }: DeleteProductDialogProps) => {
  const [deleteProduct] = useDeleteProductMutation();

  // delete the Product
  const handleDeleteProduct = async (productId: string) => {
    const res = await deleteProduct(productId).unwrap();
    if (res?.success) {
      cToast.success(res?.message);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <RiDeleteBin6Line />
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-black text-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will hide the product from all users..!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-white text-black">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-amber-500 text-black hover:bg-white hover:text-amber-500"
            onClick={() => handleDeleteProduct(productId)}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteProductDialog;
