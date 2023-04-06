import NewNotFoundPage from "containers/Pages/NewNotFoundPage";
import SectionRenderer from "@saas/builder/SectionRenderer";
import ShoppingLayout from "@saas/plugins/Shopping/containers/ShoppingLayout";
import Head from "next/head";
import { setProduct } from "@saas/stores/business/actions";
import { SHOPPING_PLUGIN_PDP_PAGE } from "@saas/stores/plugins/constants";
import {
  SHOPPING_PLUGIN,
  SHOPPING_PLUGIN_URL,
} from "@saas/utils/constants/plugins";
import { RESOURCE_API } from "@saas/utils/api";
import { handleRedirects } from "@saas/utils/helpers/handleRedirects";
import { slugify } from "@saas/utils/helpers/slugify";
import request from "@saas/utils/request";
import { BreadcrumbJsonLd, NextSeo, ProductJsonLd } from "next-seo";
import { useRouter } from "next/router";

export default function ProductPage({
  product,
  business,
  categories,
  page = {},
  urlPrefix,
}) {
  const router = useRouter();

  if (!product) {
    return (
      <div>
        <NewNotFoundPage
          item="محصول"
          buttonLink={`${urlPrefix}/s`}
          buttonText="بازگشت به صفحه سفارش آنلاین"
        />
      </div>
    );
  }
  const productCategoriesName = categories
    .filter((c) => product.labels.includes(c.id))
    .map((c) => c.name);

  const seoTitle =
    product && product.seo && product.seo.seo_title
      ? product.seo.seo_title
      : `${product.title} | خرید اینترنتی با بیشترین % تخفیف از ${business.revised_title}`;
  const seoDescription =
    product && product.seo && product.seo.meta_description
      ? product.seo.meta_description
      : `خرید آنلاین ${product.title}، مشاهده مشخصات و تخفیف و ارسال سریع.${
          productCategoriesName?.length
            ? "خرید انواع، " + productCategoriesName.join(" و ")
            : ""
        } با بهترین قیمت از ${business.revised_title}`;

  const allProductImages = [
    ...product.default_variation.images,
    ...product.images,
  ];

  return (
    <div className="pb-5">
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        openGraph={{
          url: business.get_vitrin_absolute_url + router.asPath,
          description: seoDescription,
          title: seoTitle,
        }}
      />
      <BreadcrumbJsonLd
        itemListElements={[
          {
            position: 1,
            name: "سفارش آنلاین",
            item: business.get_vitrin_absolute_url + "/s",
          },
          {
            position: 2,
            name: productCategoriesName[0],
            item: business.get_vitrin_absolute_url + "/s/l" + product.labels[0],
          },
          {
            position: 3,
            name: product.title,
            item: business.get_vitrin_absolute_url + router.asPath,
          },
        ]}
      />
      <ProductJsonLd
        productName={product.title}
        {...(allProductImages.length && {
          images: allProductImages.map((image) => image.image_url),
        })}
        {...(product.description && {
          description: product.description,
        })}
        {...(product.sku && {
          sku: product.sku,
        })}
        offers={[
          {
            price: product.default_variation.discounted_price,
            priceCurrency: "IRR",
            itemCondition: "https://schema.org/UsedCondition",
            availability: product?.available
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
            url: business.get_vitrin_absolute_url + router.asPath,
            seller: {
              name: business.revised_title,
            },
          },
        ]}
      />
      <Head>
        <>
          {product?.seo?.head_script ? parse(product?.seo?.head_script) : null}
          <meta name="product_id" content={product.id} />
          <meta name="product_name" content={product.title} />
          <meta
            name="product_price"
            content={product.default_variation.discounted_price}
          />
          <meta
            name="product_old_price"
            content={product.default_variation.initial_price}
          />
          <meta
            name="availability"
            content={
              product.default_variation.available ? "instock" : "outofstock"
            }
          />
          <meta property="og:image" content={product.main_image_url} />
          <meta
            property="og:updated_time"
            content={product.default_variation.updated_at}
          />
          <meta
            property="og:availability"
            content={product.available ? "In stock" : "Out of stock"}
          />

          <meta property="product:price:currency" content="IRR" />
          <meta
            name="keywords"
            content={product.seo.keyphrase || product.title}
          />
          {product.sku && <meta property="sku" content={product.sku} />}
          {product.extra_data?.images_alt && (
            <meta
              property="og:image:alt"
              content={product.extra_data?.images_alt}
            />
          )}
        </>
      </Head>
      <SectionRenderer sections_skeleton={page?.data?.sections_skeleton} />
    </div>
  );
}
ProductPage.getInitialProps = async ({
  res,
  query,
  store,
  urlPrefix,
  business,
  asPath,
  isServer,
}) => {
  const shoppingPluginData = store.getState().plugins.plugins[SHOPPING_PLUGIN];
  const {
    response: { meta, data },
  } = await request(RESOURCE_API(query.id.split("-")[0]), "?is_product=true");
  if (!data || (data._business && data._business !== business.id)) {
    if (res) res.statusCode = 404;
    return { statusCode: 404, urlPrefix };
  }
  const slug =
    (data.seo && slugify(data.seo.slug)) || (data.title && slugify(data.title));
  const redirectUrl = `${urlPrefix}/${SHOPPING_PLUGIN_URL}/products/${data.id}-${slug}`;
  handleRedirects({
    redirectUrl,
    isServer,
    asPath: asPath.split("?")[0],
    queryString: asPath.split("?")[1] || "",
    res,
    redirectType: 301,
  });
  if (meta.status_code >= 200 && meta.status_code <= 300) {
    store.dispatch(setProduct(data));
  }
  return {
    product: data,
    page: shoppingPluginData.pages[SHOPPING_PLUGIN_PDP_PAGE],
    urlPrefix,
    business,
    categories: store.getState().business.resource_labels,
  };
};
ProductPage.shouldNotHaveOgImage = true;
ProductPage.Wrapper = ShoppingLayout;
