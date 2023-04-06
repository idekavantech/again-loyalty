import useMediaQuery from "@material-ui/core/useMediaQuery";

export function useResponsive() {
  const minWidth1200 = useMediaQuery("(min-width:1200px)");
  const maxWidth1200 = useMediaQuery("(max-width:1200px)");
  const minWidth1024 = useMediaQuery("(min-width:1024px)");
  const maxWidth1000 = useMediaQuery("(max-width: 1000px)");
  const minWidth992 = useMediaQuery("(min-width:992px)");
  const maxWidth992 = useMediaQuery("(max-width:992px)");
  const maxWidth930 = useMediaQuery("(max-width:930px)");
  const minWidth768 = useMediaQuery("(min-width:768px)");
  const maxWidth768 = useMediaQuery("(max-width: 768px)");
  const maxWidth600 = useMediaQuery("(max-width:600px)");
  const minWidth576 = useMediaQuery("(min-width:576px)");
  const maxWidth430 = useMediaQuery("(max-width:430px)");
  const minWidth400 = useMediaQuery("(min-width: 400px)");
  const maxWidth360 = useMediaQuery("(max-width:360px)");
  const maxWidth335 = useMediaQuery("(max-width: 355px)");
  return {
    minWidth1200,
    maxWidth1200,
    minWidth1024,
    maxWidth1000,
    minWidth992,
    maxWidth992,
    maxWidth930,
    minWidth768,
    maxWidth768,
    maxWidth600,
    minWidth576,
    maxWidth430,
    minWidth400,
    maxWidth360,
    maxWidth335,
  };
}
