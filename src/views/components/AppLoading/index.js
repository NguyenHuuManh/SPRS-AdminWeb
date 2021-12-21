import ReactLoading from "react-loading";

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ isOpen }) => {
    if (isOpen) {
        return (
            <div
                className="loading-container "
                style={{
                    backgroundColor: `rgba(0,0,0,0.8)`,
                }}
            >
                <ReactLoading type={"bars"} color="#fff" />
            </div>
        );
    }
    return <div />;
};
