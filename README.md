# Tech Job Market Index

Interactive visualization comparing **JOLTS job openings** in the Information sector (NAICS 51) with **national CS bachelor's degrees conferred** (CIP 11).

## Project Structure

```
├── frontend/          # Next.js app (deployed to Vercel)
│   ├── app/           # App router pages
│   ├── components/    # Chart and table components
│   └── lib/data.ts    # Job openings + CS completions datasets
├── visualize.py       # Python script for static matplotlib chart
├── data/              # Raw CSV data
└── output/            # Generated charts (git-ignored)
```

## Running Locally

### Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Python Visualization

```bash
pip install -r requirements.txt
python visualize.py
```

Generates `output/jobs_vs_enrollment.png`.

## Data Sources

- **Job Openings**: [FRED JTU5100JOL](https://fred.stlouisfed.org/series/JTU5100JOL) — BLS JOLTS Job Openings: Information Sector, NAICS 51 (Thousands, Not Seasonally Adjusted)
- **CS Degrees**: [NCES Digest Table 325.35](https://nces.ed.gov/programs/digest/d23/tables/dt23_325.35.asp) / [National Student Clearinghouse](https://www.studentclearinghouse.org/) — National CS bachelor's degrees conferred (CIP 11). 2023-24 estimated from [CRA Taulbee Survey](https://cra.org/resources/taulbee-survey/) growth rate.

## Deploying to Vercel

Set the **Root Directory** to `frontend/` in your Vercel project settings. No other configuration needed.
