import React, { memo } from "react";

import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import LoadingIndicator from "@saas/components/LoadingIndicator";

function RenderPagesDrawer({
  entityPersianCopyRight,
  theme,
  router,
  isPagesDrawerOpen,
  togglePagesDrawer,
  loading,
  adminUrlPrefix,
  _page,
  pluginPages,
  allPages,
}) {
  return (
    <Drawer
      anchor="right"
      PaperProps={{
        className: "col-md-3 col-12 px-0",
        style: {
          pointerEvents: "auto",
          boxShadow: "0 0 4px rgba(0,0,0,0.1),0 1px 2px rgba(0,0,0,0.1)",
        },
      }}
      BackdropProps={{
        style: { background: "transparent" },
      }}
      style={{ pointerEvents: "none" }}
      open={isPagesDrawerOpen}
      onClose={() => togglePagesDrawer(false)}
    >
      <div className="w-100">
        <div
          className="d-flex justify-content-between align-items-center p-2"
          style={{
            position: "sticky",
            top: "0",
            background: "#ffffff",
          }}
        >
          <div style={{ fontWeight: "bold" }}>انتخاب صفحه</div>
          <div className="d-flex flex-row-reverse">
            <Button
              color="default"
              className="close-btn"
              onClick={() => togglePagesDrawer(false)}
            >
              بستن
            </Button>
          </div>
        </div>
        <div className="p-3">
          <style
            dangerouslySetInnerHTML={{
              __html: `
              .new-section-card-hover:hover{
                background: #ffffff;
                box-shadow: rgb(0 0 0 / 10%) 0px 2px 16px, rgb(0 0 0 / 10%) 0px 4px 8px;
              }
              `,
            }}
          ></style>
          <div>
            {!_page?.data?.is_blog &&
              Object.values(pluginPages).map((pagesObject) =>
                pagesObject.pages ? (
                  <div id={pagesObject.id} elevation={1} className="my-3">
                    <div
                      className="p-3 d-flex justify-content-between align-items-center"
                      style={{
                        color: theme.palette.text.tertiary,
                        fontSize: 16,
                      }}
                    >
                      <div>{pagesObject.pagesLabel.split("ویرایش")[1]}</div>
                    </div>
                    <div className="mt-3">
                      {Object.values(pagesObject.pages).map((page) => (
                        <div
                          key={page.id}
                          style={{
                            background: "#f5f6f7",
                            borderRadius: 4,
                            transition: "all 0.3s ease-in-out",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            router.push(
                              `${adminUrlPrefix}${
                                _page?.data?.is_blog
                                  ? "blog/"
                                  : "appearance/pages/"
                              }${page.id}${
                                pagesObject.id
                                  ? `?plugin=${pagesObject.id}`
                                  : ""
                              }`
                            )
                          }
                          className="new-section-card-hover p-3 my-2 d-flex align-items-center justify-content-between"
                        >
                          {page.data.name}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null
              )}
            <div
              className="p-3 d-flex justify-content-between align-items-center"
              style={{
                color: theme.palette.text.tertiary,
                fontSize: 16,
              }}
            >
              <div>{entityPersianCopyRight} های سایت</div>
            </div>
            {loading ? (
              <LoadingIndicator />
            ) : (
              allPages?.map((page) => (
                <div
                  key={page.id}
                  style={{
                    background: "#f5f6f7",
                    borderRadius: 4,
                    transition: "all 0.3s ease-in-out",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    router.push(
                      `${adminUrlPrefix}${
                        page?.data?.is_blog ? "blog/" : "appearance/pages/"
                      }${page.id}`
                    )
                  }
                  className="new-section-card-hover p-3 my-2 d-flex align-items-center justify-content-between"
                >
                  {page.data.name}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Drawer>
  );
}

export default memo(RenderPagesDrawer);
