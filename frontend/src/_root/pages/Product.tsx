const Product = () => {
  return (
    <div>
      <div className="flex h-1/4">
        <div className="flex flex-col w-1/2 p-5">
          <img src="/assets/images/cat-brushing.jpg" />
          <p>REVIEWS</p>
        </div>
        <div className="flex flex-col w-1/2 p-5">
          <p>TITLE</p>
          <p>DESCRIPTION</p>
          <button className="hover:cursor-pointer">MESSAGE</button>
        </div>
      </div>
      <hr />
      <div className="flex flex-col p-5">
        <p>LATEST REVIEWS</p>
        <p>
          ALEX: UTTER DOGSHIT SERVICE{" "}
          <span>
            <button className="hover:cursor-pointer">MESSAGE</button>
          </span>
        </p>
        <div className="flex p-5 justify-between">
          <p>LOAD MORE...</p>
          <p>LEAVE A REVIEW</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
