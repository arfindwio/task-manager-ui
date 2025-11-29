interface PDFPreviewModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export const PDFPreviewModal = ({
  children,
  onClose,
}: PDFPreviewModalProps) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="relative h-[90%] w-[90%] overflow-hidden rounded-lg bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
