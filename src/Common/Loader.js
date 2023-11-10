import ClipLoader from "react-spinners/ClipLoader";

// const CSSProperties 



export default function Spinner() {
    return (
        <div className="sweet-loading">
            <ClipLoader size={70} color="#66636a" />
            {/* <p>Please wait data is loading</p> */}
        </div>
    );
}