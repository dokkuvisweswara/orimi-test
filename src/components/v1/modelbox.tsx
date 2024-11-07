import { useRouter } from "next/navigation";
export default function Modal({ isVisible, onClose, children, AllClass }: any) {
  const router = useRouter();
  if (!isVisible) return null;
  const handleClose = (e:any) => {
    if (e.target.id === "modal-body") {
      router.push('/')
    }
    
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] z-[999] overflow-y-scroll modal-content"
      id="modal-body"
    >
      <div className={`${AllClass} flex flex-col rounded`}>
        {children}
      </div>
    </div>
  );
}
