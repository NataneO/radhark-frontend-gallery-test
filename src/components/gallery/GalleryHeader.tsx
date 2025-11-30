import UploadFileButton from "./UploadFileButton";

const GalleryHeader: React.FC<{refreshPageView: () => void;}> =  ({ refreshPageView}) => (

  <>
     <UploadFileButton onUpload={refreshPageView} />
  <div className="flex items-center justify-center h-[300px]">
           
    <h1 className="text-4xl font-extrabold text-center">Galeria</h1>
    </div>
    </>
);

export default GalleryHeader; 