import { useEffect, useState } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";

const CommentArea = ({ asin }) => {
  // state = {
  //   comments: [],
  //   isLoading: false,
  //   isError: false,
  // };
  const [comment, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [isError, setIsError] = useState(false);

  const myFunc = async () => {
    setIsLoading(false);
    if (asin !== null) {
      setIsLoading(true);
      try {
        let response = await fetch(
          `https://striveschool-api.herokuapp.com/api/comments/` + asin,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTNhNTlhZWY2ZTNkZDAwMTQ5NWU0M2YiLCJpYXQiOjE2OTg3NTUxNTYsImV4cCI6MTY5OTk2NDc1Nn0.Lt2mEzp7bnpaBSEK7Rz8Z-HKFC5oyWZnvqWtprmozlA",
            },
          }
        );
        console.log(response);
        if (response.ok) {
          let comments = await response.json();
          setComments(comments);
          setIsLoading(false);
          // setIsError(false);
          // this.setState({
          //   comments: comments,
          //   isLoading: false,
          //   isError: false,
          // });
        } else {
          // setIsError(true);
          setIsLoading(false);
          // this.setState({ isLoading: false, isError: true });
        }
      } catch (error) {
        console.log(error);
        // setIsError(true);
        setIsLoading(false);
        // this.setState({ isLoading: false, isError: true });
      }
    }
  };
  useEffect(() => {
    myFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asin]);

  // componentDidUpdate = async (prevProps) => {
  //   if (prevProps.asin !== this.props.asin) {
  //     this.setState({
  //       isLoading: true,
  //     });
  //     try {
  //       let response = await fetch(
  //         "https://striveschool-api.herokuapp.com/api/comments/" +
  //           this.props.asin,
  //         {
  //           headers: {
  //             Authorization: "Bearer inserisci-qui-il-tuo-token",
  //           },
  //         }
  //       );
  //       console.log(response);
  //       if (response.ok) {
  //         let comments = await response.json();
  //         this.setState({
  //           comments: comments,
  //           isLoading: false,
  //           isError: false,
  //         });
  //       } else {
  //         this.setState({ isLoading: false, isError: true });
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       this.setState({ isLoading: false, isError: true });
  //     }
  //   }
  // };

  return (
    <div className="text-center">
      {isLoading && <Loading />}

      <AddComment asin={asin} />
      <CommentList commentsToShow={comment} />
    </div>
  );
};

export default CommentArea;
