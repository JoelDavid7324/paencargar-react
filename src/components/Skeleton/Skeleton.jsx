import "./skeleton.css";

// eslint-disable-next-line react/prop-types
export const Skeleton = () => {
  return (
    <div className="skeletonContainer">
      <div className="skeleton skeletonImage"></div>
      <div className="skeleton skeletonTitle"></div>
      <div className="skeleton skeletonDescription "></div>
      <div className="skeleton skeletonDescription skeletonDescription2"></div>
      <div className="skeletonButtons">
        <div className="skeleton skelButton1"></div>
        <div className="skeleton skelButton2"></div>
        <div className="skeleton skelButton3"></div>
      </div>
    </div>
  );
};
