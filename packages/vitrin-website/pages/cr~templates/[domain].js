import TemplatePape from "containers/templatePage";
import Head from "next/head";
import { useRouter } from "next/router";
import { templates } from "containers/templatesPage/constants";

export default function Template() {
  const router = useRouter();
  const { domain } = router?.query;
  const template = templates.find((tmp) => tmp.domain == domain);
  
  return (
    <div>
      <Head>
        <title>
          قالب {template?.title}
        </title>
        <meta
          name="description"
          content={template?.description}
        />
        <meta
          property="og:title"
          content={`قالب ${template?.title}`}
        />
        <meta
          property="og:description"
          content={template?.description}
        />
        <meta
          name="twitter:title"
          content={`قالب ${template?.title}`}
        />
        <meta
          property="twitter:description"
          content={template?.description}
        />
      </Head>
      <TemplatePape template={template} domain={domain} />
    </div>
  );
}
