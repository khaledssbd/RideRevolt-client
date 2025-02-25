/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';

// const HotToast = () => {
//   const saveSettings = () => {
//     return toast.promise(
//       new Promise(resolve => {
//         setTimeout(() => resolve('Settings saved!'), 3000);
//       }),
//       {
//         loading: 'Saving...',
//         success: 'Settings saved!',
//         error: 'Could not save.',
//       }
//     );
//   };

//   // const trying = () => {
//   //   return toast.custom((t: any) => (
//   //     <div
//   //       className={`${
//   //         t.visible ? 'animate-enter' : 'animate-leave'
//   //       } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-amber-500 ring-opacity-5`}
//   //     >
//   //       <div className="flex-1 w-0 p-4">
//   //         <div className="flex items-start">
//   //           <div className="flex-shrink-0 pt-0.5">
//   //             <img
//   //               className="h-10 w-10 rounded-full"
//   //               src="https://github.com/shadcn.png"
//   //               alt=""
//   //             />
//   //           </div>
//   //           <div className="ml-3 flex-1">
//   //             <p className="text-sm font-medium text-gray-900">Shadcn</p>
//   //             <p className="mt-1 text-sm text-gray-500">
//   //               This is honestly cooler than our toast
//   //             </p>
//   //           </div>
//   //         </div>
//   //       </div>
//   //       <div className="flex border-l border-gray-200">
//   //         <button
//   //           onClick={() => toast.dismiss(t.id)}
//   //           className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-amber-600 hover:text-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
//   //         >
//   //           Close
//   //         </button>
//   //       </div>
//   //     </div>
//   //   ));
//   // };

//   return (
//     <div className="flex flex-col gap-4">
//       <Button onClick={() => toast.success('Hello')}>Success</Button>
//       <Button variant={'destructive'} onClick={() => toast.error('Hello')}>
//         Error
//       </Button>
//       <Button onClick={() => saveSettings()}>Promise</Button>
//       <Button
//         onClick={() =>
//           toast('Good Job!', {
//             icon: '👏',
//           })
//         }
//       >
//         with emoji
//       </Button>
//       <Button
//         onClick={() =>
//           toast('Hello Darkness!', {
//             icon: '👏',
//             style: {
//               borderRadius: '10px',
//               background: '#333',
//               color: '#fff',
//             },
//           })
//         }
//       >
//         Dark Mode
//       </Button>
//       <Button
//         onClick={() =>
//           toast.custom((t: any) => (
//             <div
//               className={`${
//                 t.visible ? 'animate-enter' : 'animate-leave'
//               } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-amber-500 ring-opacity-5`}
//             >
//               <div className="flex-1 w-0 p-4">
//                 <div className="flex items-start">
//                   <div className="flex-shrink-0 pt-0.5">
//                     <img
//                       className="h-10 w-10 rounded-full"
//                       src="https://github.com/shadcn.png"
//                       alt=""
//                     />
//                   </div>
//                   <div className="ml-3 flex-1">
//                     <p className="text-sm font-medium text-gray-900">Shadcn</p>
//                     <p className="mt-1 text-sm text-gray-500">
//                       This is honestly cooler than our toast
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex border-l border-gray-200">
//                 <button
//                   onClick={() => toast.dismiss(t.id)}
//                   className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-amber-600 hover:text-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           ))
//         }
//       >
//         Tailwind
//       </Button>

//       {/* you can have a themed one but tailwind is even cooler */}
//     </div>
//   );
// };

// export default HotToast;

const success = (message: string) => {
  return toast.custom(
    (t: any) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-black dark:bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-amber-500 ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <img
                className="h-10 w-10 rounded-full"
                src="/RideRevolt.png"
                alt="RideRevolt"
              />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-white dark:text-gray-900">
                Success!
              </p>
              <p className="mt-1 text-sm text-white dark:text-gray-500">
                {message}
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200 dark:border-black">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-amber-600 hover:text-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            Close
          </button>
        </div>
      </div>
    ),
    { duration: 2000 }
  );
};

const error = (message: string) => {
  return toast.custom(
    (t: any) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-black dark:bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-amber-500 ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <img
                className="h-10 w-10 rounded-full"
                src="/RideRevolt-fav.png"
                alt="RideRevolt"
              />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-white dark:text-gray-900">
                Error!
              </p>
              <p className="mt-1 text-sm text-white dark:text-gray-500">
                {message}
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200 dark:border-black">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-amber-600 hover:text-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            Close
          </button>
        </div>
      </div>
    ),
    { duration: 2000 }
  );
};

const cToast = {
  success,
  error,
};

export default cToast;
