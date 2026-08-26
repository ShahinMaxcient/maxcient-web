import TechnologyDetail from "@/components/TechnologyDetail";

// Microsoft Azure AI — content researched for the Dynamics 365 / Power Platform stack.
export default function AzureAI() {
  return (
    <TechnologyDetail
      slug="azure-ai"
      title="Azure AI"
      subtitle="Enterprise AI models, grounded in your Dynamics 365 data."
      heroImage="https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/photo-1677442136019-21780ecad995.webp"
      whatIsHeading="What is Azure AI?"
      whatIsBody="Azure AI is Microsoft's enterprise platform for building and running AI, unified under Azure AI Foundry (now Microsoft Foundry). It brings together a catalogue of more than 10,000 models — Azure OpenAI's GPT and reasoning families alongside Meta, Mistral, Cohere, DeepSeek and Microsoft's own Phi — with prebuilt services for vision, language, speech, document processing and retrieval. Everything runs inside your Azure tenant, so your data stays governed, isolated and is never used to train the foundation models."
      whatIsImage="https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/azure-ai-whatis.webp"
      callouts={[
        { title: "Breadth of models", body: "One catalogue, over 10,000 models — from Azure OpenAI's GPT-5 and o-series reasoning to Llama, Mistral, Cohere and Phi. We match the right model to each task on cost, latency and accuracy." },
        { title: "Grounded in your data", body: "Retrieval-augmented generation over Dataverse and Azure AI Search keeps answers accurate, explainable and citation-backed — constrained to your business content, not the open web." },
        { title: "Native to Dynamics 365", body: "Azure AI flows straight into CRM and ERP through Copilot, AI Builder and the Power Platform, so intelligence lands where your teams already work." },
      ]}
      servicesHeading="What Maxcient delivers"
      services={[
        { title: "Azure AI Foundry & model strategy", body: "We stand up your Azure AI Foundry environment, select the right models for each workload, and put the governance, evaluation and cost controls in place to run them safely in production.", bullets: ["Foundry landing zone and network isolation", "Model selection and benchmarking per use case", "Prompt evaluation, Content Safety and guardrails"] },
        { title: "RAG & Copilot engineering", body: "We ground large language models in your enterprise data with Azure AI Search and Dataverse, then build the copilots and autonomous agents that put those answers in front of users.", bullets: ["Hybrid and agentic retrieval on Azure AI Search", "Dataverse-grounded agents in Copilot Studio", "Intelligent document processing with AI Builder"] },
        { title: "Dynamics 365 & Power Platform integration", body: "We connect Azure AI into your CRM and ERP with durable integration patterns, so AI reads and writes real business data and triggers real actions.", bullets: ["Power Automate flows and business events", "Azure Functions and custom connectors", "Dual-write to Dynamics 365 Finance and Sales"] },
      ]}
      serviceImages={[
        "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/azure-ai-svc-1.webp",
        "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/azure-ai-svc-2.webp",
        "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/azure-ai-svc-3.webp",
      ]}
      modulesHeading="One platform, every model"
      modulesIntro="Azure AI Foundry consolidates Microsoft's models and prebuilt services under a single catalogue, governance model and billing relationship. These are the building blocks we assemble for Dynamics 365 and the Power Platform."
      modules={[
        { name: "Azure AI Foundry", body: "The unified platform and model catalogue — over 10,000 models from Microsoft, OpenAI, Meta, Mistral, Cohere and DeepSeek — with tooling to deploy, evaluate and orchestrate agents." },
        { name: "Azure OpenAI Service", body: "Hosts the GPT-4.1 and GPT-5 families, o-series reasoning models, text embeddings, the gpt-image-1 image model and Whisper speech-to-text, billed and secured by Microsoft." },
        { name: "Azure AI Search", body: "The retrieval engine for enterprise RAG: full-text, vector and hybrid search fused with a semantic ranker, plus agentic retrieval that decomposes complex queries into subqueries." },
        { name: "Azure AI Document Intelligence", body: "Extracts fields, tables and line items from invoices, receipts, contracts and IDs using prebuilt and custom models — now extending into Azure AI Content Understanding." },
        { name: "Azure AI Vision", body: "Image Analysis 4.0 for captioning, tagging and object detection, with Read OCR for printed and handwritten text — the basis for defect detection on the production line." },
        { name: "Azure AI Language & Speech", body: "Sentiment, entity recognition and PII redaction with Phi-tuned summarization, plus real-time speech-to-text, neural text-to-speech and live speech translation across 100-plus languages." },
      ]}
      industryIntro="The same models and services take a different shape in each sector. Here is where Azure AI and Dynamics 365 create measurable value across the industries we serve in the UAE and wider GCC."
      industryCallouts={[
        { name: "Manufacturing", body: "Azure IoT and Azure Machine Learning detect equipment anomalies from vibration and temperature data, auto-raising work orders in Dynamics 365 Field Service before assets fail — while Azure AI Vision catches surface and dimensional defects on the line and feeds outcomes back into Supply Chain Management." },
        { name: "Real Estate", body: "Azure AI Document Intelligence with Azure OpenAI reads leases and contracts, extracting clauses, financial terms and renewal dates, setting alerts and pushing structured data into Dynamics 365 — while Azure AI Services condense property and market data for valuation and portfolio insight." },
        { name: "Retail", body: "Copilot in Dynamics 365 Supply Chain Management lets planners forecast demand in natural language and spot deviations, while Azure OpenAI-powered Dynamics 365 Copilot generates personalised offers and recommendations, extended with custom fulfilment agents in Copilot Studio." },
        { name: "Distribution", body: "Azure AI Document Intelligence extracts data from PDF and scanned vendor invoices, validates it against Dynamics 365 Finance and routes it through Power Automate approvals — while Azure Machine Learning drives demand and route optimisation across the network." },
        { name: "Professional Services", body: "Copilot in Dynamics 365 Project Operations drafts project plans, summaries and status updates, while Azure OpenAI-powered predictive analytics deliver resource planning and explainable revenue forecasts with natural-language insight into trends and deviations." },
      ]}
      ctaTitle="Put Azure AI to work in Dynamics 365"
      ctaSubtitle="Talk to Maxcient about grounding Microsoft's AI models in your CRM and ERP across the UAE and GCC."
    />
  );
}
