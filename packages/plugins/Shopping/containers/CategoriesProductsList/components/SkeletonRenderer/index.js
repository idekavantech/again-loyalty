import Paper from "@material-ui/core/Paper";
import Skeleton from "@material-ui/lab/Skeleton";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

const SkeletonRenderer = ({}) => {
  const {maxWidth768} = useResponsive()

  return (
    <>
      <div>
        <div className={`${maxWidth768 ? "pb-3" : "pb-3"}`}>
          <Skeleton variant="text" width={100} height={34} />
        </div>
        <div className="row">
          {Array(3)
            .fill("")
            .map((_) => (
              <div
                key={_}
                className={`col-xl-4 col-md-6 col-12 ${
                  maxWidth768 ? "mb-3" : "my-3"
                }`}
              >
                <Paper
                  className={`${
                    maxWidth768 ? "p-3" : "p-5"
                  } w-100 new-product-card`}
                  style={{
                    border: "1px solid rgba(228, 230, 231, 0.6)",
                    borderRadius: 8,
                    height: maxWidth768 ? 120 : 153,
                    backgroundColor: "#fff",
                  }}
                >
                  <div className="d-flex align-items-start w-100 h-100">
                    <div className="ml-5">
                      <Skeleton
                        style={{
                          border: "1px solid rgba(228, 230, 231, 0.6)",
                          borderRadius: maxWidth768 ? 4 : 8,
                        }}
                        className="overflow-hidden"
                        variant="rect"
                        width={maxWidth768 ? 64 : 104}
                        height={maxWidth768 ? 64 : 104}
                      />
                    </div>
                    <div className="d-flex flex-column h-100 w-75">
                      <div>
                        <Skeleton variant="text" width={90} height={25} />
                        <Skeleton variant="text" width={200} height={20} />
                      </div>
                      <div className="d-flex w-100 align-items-center justify-content-between mt-auto ">
                        <div className="d-flex">
                          <Skeleton
                            variant="text"
                            width={maxWidth768 ? 54 : 60}
                            height={maxWidth768 ? 20 : 25}
                          />
                          <Skeleton
                            className="mr-1"
                            variant="text"
                            width={maxWidth768 ? 22 : 30}
                            height={maxWidth768 ? 20 : 25}
                          />
                        </div>
                        <div>
                          <Skeleton
                            variant="circle"
                            width={maxWidth768 ? 30 : 36}
                            height={maxWidth768 ? 30 : 36}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Paper>
              </div>
            ))}
        </div>
      </div>
      <div>
        <Skeleton
          className={`${maxWidth768 ? "pt-5 pb-4" : "pb-3 pt-5"}`}
          variant="text"
          width={100}
          height={34}
        />
        <div className="row">
          <div
            className={`col-xl-4 col-md-6 col-12 ${maxWidth768 ? "mb-3" : "my-3"}`}
          >
            <Paper
              className={`${maxWidth768 ? "p-3" : "p-5"} w-100 new-product-card`}
              style={{
                border: "1px solid rgba(228, 230, 231, 0.6)",
                borderRadius: 8,
                height: maxWidth768 ? 120 : 153,
                backgroundColor: "#fff",
              }}
            >
              <div className="d-flex align-items-start w-100 h-100">
                <div className="ml-5">
                  <Skeleton
                    style={{
                      border: "1px solid rgba(228, 230, 231, 0.6)",
                      borderRadius: maxWidth768 ? 4 : 8,
                    }}
                    className="overflow-hidden"
                    variant="rect"
                    width={maxWidth768 ? 64 : 104}
                    height={maxWidth768 ? 64 : 104}
                  />
                </div>
                <div className="d-flex flex-column h-100 w-75">
                  <div>
                    <Skeleton variant="text" width={90} height={25} />
                    <Skeleton variant="text" width={200} height={20} />
                  </div>
                  <div className="d-flex w-100 align-items-center justify-content-between mt-auto ">
                    <div className="d-flex">
                      <Skeleton
                        variant="text"
                        width={maxWidth768 ? 54 : 60}
                        height={maxWidth768 ? 20 : 25}
                      />
                      <Skeleton
                        className="mr-1"
                        variant="text"
                        width={maxWidth768 ? 22 : 30}
                        height={maxWidth768 ? 20 : 25}
                      />
                    </div>
                    <div>
                      <Skeleton
                        variant="circle"
                        width={maxWidth768 ? 30 : 36}
                        height={maxWidth768 ? 30 : 36}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Paper>
          </div>
          <div
            className={`col-xl-4 col-md-6 col-12 ${maxWidth768 ? "mb-3" : "my-3"}`}
          >
            <Paper
              className={`${maxWidth768 ? "p-3" : "p-5"} w-100 new-product-card`}
              style={{
                border: "1px solid rgba(228, 230, 231, 0.6)",
                borderRadius: 8,
                height: maxWidth768 ? 120 : 153,
                backgroundColor: "#fff",
              }}
            >
              <div className="d-flex align-items-start w-100 h-100">
                <div className="ml-5">
                  <Skeleton
                    style={{
                      border: "1px solid rgba(228, 230, 231, 0.6)",
                      borderRadius: maxWidth768 ? 4 : 8,
                    }}
                    className="overflow-hidden"
                    variant="rect"
                    width={maxWidth768 ? 64 : 104}
                    height={maxWidth768 ? 64 : 104}
                  />
                </div>
                <div className="d-flex flex-column h-100 w-75">
                  <div>
                    <Skeleton variant="text" width={90} height={25} />
                    <Skeleton variant="text" width={200} height={20} />
                  </div>
                  <div className="d-flex w-100 align-items-center justify-content-between mt-auto ">
                    <div className="d-flex">
                      <Skeleton
                        variant="text"
                        width={maxWidth768 ? 54 : 60}
                        height={maxWidth768 ? 20 : 25}
                      />
                      <Skeleton
                        className="mr-1"
                        variant="text"
                        width={maxWidth768 ? 22 : 30}
                        height={maxWidth768 ? 20 : 25}
                      />
                    </div>
                    <div>
                      <Skeleton
                        variant="circle"
                        width={maxWidth768 ? 30 : 36}
                        height={maxWidth768 ? 30 : 36}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Paper>
          </div>
          <div
            className={`col-xl-4 col-md-6 col-12 ${maxWidth768 ? "mb-3" : "my-3"}`}
          >
            <Paper
              className={`${maxWidth768 ? "p-3" : "p-5"} w-100 new-product-card`}
              style={{
                border: "1px solid rgba(228, 230, 231, 0.6)",
                borderRadius: 8,
                height: maxWidth768 ? 120 : 153,
                backgroundColor: "#fff",
              }}
            >
              <div className="d-flex align-items-start w-100 h-100">
                <div className="ml-5">
                  <Skeleton
                    style={{
                      border: "1px solid rgba(228, 230, 231, 0.6)",
                      borderRadius: maxWidth768 ? 4 : 8,
                    }}
                    className="overflow-hidden"
                    variant="rect"
                    width={maxWidth768 ? 64 : 104}
                    height={maxWidth768 ? 64 : 104}
                  />
                </div>
                <div className="d-flex flex-column h-100 w-75">
                  <div>
                    <Skeleton variant="text" width={90} height={25} />
                    <Skeleton variant="text" width={200} height={20} />
                  </div>
                  <div className="d-flex w-100 align-items-center justify-content-between mt-auto ">
                    <div className="d-flex">
                      <Skeleton
                        variant="text"
                        width={maxWidth768 ? 54 : 60}
                        height={maxWidth768 ? 20 : 25}
                      />
                      <Skeleton
                        className="mr-1"
                        variant="text"
                        width={maxWidth768 ? 22 : 30}
                        height={maxWidth768 ? 20 : 25}
                      />
                    </div>
                    <div>
                      <Skeleton
                        variant="circle"
                        width={maxWidth768 ? 30 : 36}
                        height={maxWidth768 ? 30 : 36}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Paper>
          </div>
        </div>
      </div>
      <div>
        <Skeleton
          className={`${maxWidth768 ? "pt-5 pb-4" : "pb-3 pt-5"}`}
          variant="text"
          width={100}
          height={34}
        />
        <div className="row">
          <div
            className={`col-xl-4 col-md-6 col-12 ${maxWidth768 ? "mb-3" : "my-3"}`}
          >
            <Paper
              className={`${maxWidth768 ? "p-3" : "p-5"} w-100 new-product-card`}
              style={{
                border: "1px solid rgba(228, 230, 231, 0.6)",
                borderRadius: 8,
                height: maxWidth768 ? 120 : 153,
                backgroundColor: "#fff",
              }}
            >
              <div className="d-flex align-items-start w-100 h-100">
                <div className="ml-5">
                  <Skeleton
                    style={{
                      border: "1px solid rgba(228, 230, 231, 0.6)",
                      borderRadius: maxWidth768 ? 4 : 8,
                    }}
                    className="overflow-hidden"
                    variant="rect"
                    width={maxWidth768 ? 64 : 104}
                    height={maxWidth768 ? 64 : 104}
                  />
                </div>
                <div className="d-flex flex-column h-100 w-75">
                  <div>
                    <Skeleton variant="text" width={90} height={25} />
                    <Skeleton variant="text" width={200} height={20} />
                  </div>
                  <div className="d-flex w-100 align-items-center justify-content-between mt-auto ">
                    <div className="d-flex">
                      <Skeleton
                        variant="text"
                        width={maxWidth768 ? 54 : 60}
                        height={maxWidth768 ? 20 : 25}
                      />
                      <Skeleton
                        className="mr-1"
                        variant="text"
                        width={maxWidth768 ? 22 : 30}
                        height={maxWidth768 ? 20 : 25}
                      />
                    </div>
                    <div>
                      <Skeleton
                        variant="circle"
                        width={maxWidth768 ? 30 : 36}
                        height={maxWidth768 ? 30 : 36}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Paper>
          </div>
          <div
            className={`col-xl-4 col-md-6 col-12 ${maxWidth768 ? "mb-3" : "my-3"}`}
          >
            <Paper
              className={`${maxWidth768 ? "p-3" : "p-5"} w-100 new-product-card`}
              style={{
                border: "1px solid rgba(228, 230, 231, 0.6)",
                borderRadius: 8,
                height: maxWidth768 ? 120 : 153,
                backgroundColor: "#fff",
              }}
            >
              <div className="d-flex align-items-start w-100 h-100">
                <div className="ml-5">
                  <Skeleton
                    style={{
                      border: "1px solid rgba(228, 230, 231, 0.6)",
                      borderRadius: maxWidth768 ? 4 : 8,
                    }}
                    className="overflow-hidden"
                    variant="rect"
                    width={maxWidth768 ? 64 : 104}
                    height={maxWidth768 ? 64 : 104}
                  />
                </div>
                <div className="d-flex flex-column h-100 w-75">
                  <div>
                    <Skeleton variant="text" width={90} height={25} />
                    <Skeleton variant="text" width={200} height={20} />
                  </div>
                  <div className="d-flex w-100 align-items-center justify-content-between mt-auto ">
                    <div className="d-flex">
                      <Skeleton
                        variant="text"
                        width={maxWidth768 ? 54 : 60}
                        height={maxWidth768 ? 20 : 25}
                      />
                      <Skeleton
                        className="mr-1"
                        variant="text"
                        width={maxWidth768 ? 22 : 30}
                        height={maxWidth768 ? 20 : 25}
                      />
                    </div>
                    <div>
                      <Skeleton
                        variant="circle"
                        width={maxWidth768 ? 30 : 36}
                        height={maxWidth768 ? 30 : 36}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Paper>
          </div>
          <div
            className={`col-xl-4 col-md-6 col-12 ${maxWidth768 ? "mb-3" : "my-3"}`}
          >
            <Paper
              className={`${maxWidth768 ? "p-3" : "p-5"} w-100 new-product-card`}
              style={{
                border: "1px solid rgba(228, 230, 231, 0.6)",
                borderRadius: 8,
                height: maxWidth768 ? 120 : 153,
                backgroundColor: "#fff",
              }}
            >
              <div className="d-flex align-items-start w-100 h-100">
                <div className="ml-5">
                  <Skeleton
                    style={{
                      border: "1px solid rgba(228, 230, 231, 0.6)",
                      borderRadius: maxWidth768 ? 4 : 8,
                    }}
                    className="overflow-hidden"
                    variant="rect"
                    width={maxWidth768 ? 64 : 104}
                    height={maxWidth768 ? 64 : 104}
                  />
                </div>
                <div className="d-flex flex-column h-100 w-75">
                  <div>
                    <Skeleton variant="text" width={90} height={25} />
                    <Skeleton variant="text" width={200} height={20} />
                  </div>
                  <div className="d-flex w-100 align-items-center justify-content-between mt-auto ">
                    <div className="d-flex">
                      <Skeleton
                        variant="text"
                        width={maxWidth768 ? 54 : 60}
                        height={maxWidth768 ? 20 : 25}
                      />
                      <Skeleton
                        className="mr-1"
                        variant="text"
                        width={maxWidth768 ? 22 : 30}
                        height={maxWidth768 ? 20 : 25}
                      />
                    </div>
                    <div>
                      <Skeleton
                        variant="circle"
                        width={maxWidth768 ? 30 : 36}
                        height={maxWidth768 ? 30 : 36}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Paper>
          </div>
        </div>
      </div>
    </>
  );
};

export default SkeletonRenderer;
