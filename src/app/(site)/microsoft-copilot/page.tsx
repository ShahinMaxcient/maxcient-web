import TechnologyDetail from "@/components/TechnologyDetail";


import { pageMetadata } from "@/lib/seo";

// Unique title/description per page; Admin → Pages can override both.
export const generateMetadata = () =>
  pageMetadata({
    slug: "microsoft-copilot",
    title: "Microsoft Copilot for Business",
    description:
      "Microsoft's AI assistant grounded in your own Dataverse and Microsoft 365 data, with custom agents built in Copilot Studio.",
  image: "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/copilot-hero.webp",
  });

// Microsoft Copilot — content researched for the Dynamics 365 / Power Platform stack.
export default function MicrosoftCopilot() {
  return (
    <TechnologyDetail
      slug="microsoft-copilot"
      title="Microsoft Copilot"
      subtitle="Ready-made AI assistants, grounded in your Dynamics 365 and Microsoft 365 data."
      description="We help you switch on the AI assistant already built into the software you license, then extend it where the out-of-the-box answer stops. Maxcient configures Copilot across Dynamics 365, grounds it on your Dataverse and Microsoft 365 content, builds custom agents in Copilot Studio, and puts the permissions and governance in place before anyone starts asking it questions."
      heroImage="https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/copilot-hero.webp"
      whatIsHeading="What is Microsoft Copilot?"
      whatIsBody="Microsoft Copilot is the ready-made AI assistant experience, not a raw model you assemble yourself. It runs on the same large language models delivered through Azure OpenAI, but grounds every answer in your own business data — your Dataverse CRM and ERP records and your Microsoft Graph emails, files and chats — before it responds. Azure AI Foundry is the pro-developer platform for building custom AI apps from scratch; Copilot, and Copilot Studio, is the packaged, low-code assistant built on top of it. For a Dynamics 365 team, intelligence arrives inside the apps you already use, reflecting your company context rather than generic web answers."
      whatIsImage="https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/copilot-whatis.webp"
      callouts={[
        { title: "Native to Dynamics 365", body: "Copilot lives inside the apps your teams already use — Dynamics 365 Sales, Customer Service, Finance and Business Central — surfacing summaries, drafts and answers directly on the record instead of in a separate tool." },
        { title: "Grounded in your data", body: "Every response is grounded in your Dataverse CRM and ERP records and Microsoft Graph content, honouring each user's existing permissions, so Copilot answers only from data that person is already allowed to see." },
        { title: "Governed in your tenant", body: "Prompts, responses and grounding data stay inside your Microsoft 365 tenant and are never used to train foundation models, with DLP policies, Purview audit logs and Entra ID controls enforced by default." },
      ]}
      servicesHeading="What Maxcient delivers"
      services={[
        { title: "Copilot enablement across Dynamics 365", body: "We switch on and configure Copilot where it earns its keep — Sales, Customer Service, Finance, Supply Chain and Business Central — tuning case summaries, connecting SharePoint and Dataverse knowledge sources, and training your teams so adoption actually sticks.", bullets: ["Feature configuration in Sales, Service & Finance", "Knowledge source and Dataverse grounding", "User enablement and adoption"] },
        { title: "Custom agents with Copilot Studio", body: "We design and build declarative and autonomous agents grounded on your Dataverse and Microsoft Graph data, wired to line-of-business systems through Power Platform connectors, MCP servers and Power Automate, then publish them to Teams and Microsoft 365 Copilot.", bullets: ["Declarative & autonomous agent design", "Connectors, MCP and Power Automate actions", "Publishing to Teams & M365 Copilot"] },
        { title: "Governance, security and compliance", body: "We set the guardrails: DLP data policies, geographic data residency, customer-managed keys and Customer Lockbox, Purview audit logging and Sentinel alerting, plus Entra ID identities and Conditional Access for agents through Microsoft Agent 365.", bullets: ["DLP policies and data residency", "Purview audit and Sentinel alerting", "Entra identities for agents"] },
      ]}
      serviceImages={[
        "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/copilot-svc-1.webp",
        "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/copilot-svc-2.webp",
        "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/copilot-svc-3.webp",
      ]}
      modulesHeading="The Copilot surfaces that matter for Dynamics 365"
      modulesIntro="These are the Copilot surfaces most relevant to a Dynamics 365 customer — from the Microsoft 365 assistant to embedded CRM and ERP Copilots and the studio where you build your own agents."
      modules={[
        { name: "Microsoft 365 Copilot", body: "The premium assistant embedded in Word, Excel, PowerPoint, Outlook and Teams, grounded on your Microsoft Graph data. Its role-based Sales, Service and Finance agents pull Dynamics 365 CRM and ERP context straight into email and meetings." },
        { name: "Copilot in Dynamics 365 Sales", body: "Summarises leads, opportunities and accounts, drafts and retunes emails with CRM fields pulled in, and answers plain-language questions over Dataverse — returning only the records the seller is permitted to see." },
        { name: "Copilot in Dynamics 365 Customer Service", body: "Drafts email and chat replies in context, answers from your knowledge base with citations, summarises cases and live conversations, and translates responses inside the Copilot Service workspace." },
        { name: "Copilot in Dynamics 365 Finance & Supply Chain Management", body: "Generates collections summaries and reminder emails in Finance, and answers natural-language demand-planning questions — period comparisons, anomaly and deviation analysis — plus post-confirmation purchase-order summaries in Supply Chain Management." },
        { name: "Copilot in Dynamics 365 Business Central", body: "Assists bank reconciliation by proposing ledger matches, drafts product marketing text, suggests sales-document lines from purchase history and inventory, and answers how-to and find-a-record questions through side-pane chat." },
        { name: "Copilot Studio", body: "Microsoft's low-code platform for building declarative and autonomous agents, grounded on Dataverse and Graph, connected through 1,400+ Power Platform connectors and MCP, and published to Teams and Microsoft 365 Copilot." },
      ]}
      industryIntro="Copilot's value shows up differently in each sector we serve across the UAE and GCC. Here is where Microsoft's ready-made AI lands first inside Dynamics 365 for five industries."
      industryCallouts={[
        { name: "Manufacturing", body: "In Supply Chain Management, planners ask Copilot to compare this quarter's demand plan against baseline, flag anomalies and explain deviations in plain language, while Finance uses collections coordinator summaries and drafted reminder emails to chase overdue accounts — keeping production and cash flow aligned." },
        { name: "Real Estate", body: "Property and facilities teams let Copilot in Dynamics 365 Sales summarise every opportunity and draft tenant emails, while Customer Service Copilot answers maintenance queries from your knowledge base with citations and drafts responses for fast, consistent tenant support." },
        { name: "Retail", body: "Retailers use Copilot in Business Central to auto-draft product marketing text and suggest sales lines from purchase history and available stock, while Customer Insights Query Assist builds shopper segments from a plain-language description — no data-model expertise required." },
        { name: "Distribution", body: "Distributors lean on the confirmed purchase orders with changes workspace, where Copilot summarises post-confirmation changes and drafts vendor follow-ups, and on Business Central bank reconciliation that proposes ledger matches by date, amount and description — keeping vendor and cash records clean." },
        { name: "Professional Services", body: "Consultancies use Copilot in Dynamics 365 Project Operations to generate a work breakdown of up to 100 tasks from a project description, build a risk register with suggested mitigations, and produce internal or external status reports from live KPIs and financials." },
      ]}
      ctaTitle="Bring Copilot into your Dynamics 365"
      ctaSubtitle="Maxcient helps UAE and GCC teams enable, extend and govern Microsoft Copilot across Dynamics 365."
    />
  );
}
