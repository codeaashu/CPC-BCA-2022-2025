import google.generativeai as genai

genai.configure(api_key="AIzaSyCasbV-y9XU_V-RtSpm93s_nscLw_uxPCI")

models = genai.list_models()

for m in models:
    print("🔎 Model Name:", m.name)
    print("   Supported Generation Methods:", m.supported_generation_methods)
    print("---------------------------------------------------")
