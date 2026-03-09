# Tech Job Market Index

Interactive visualization comparing **JOLTS job openings** in the Information sector (NAICS 51) with **undergraduate CS enrollment** at the top 20 US universities.

## Project Structure

```
├── frontend/          # Next.js app (deployed to Vercel)
│   ├── app/           # App router pages
│   ├── components/    # Chart and table components
│   └── lib/data.ts    # Job postings + enrollment datasets
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
- **Enrollment**: [CRA Taulbee Survey](https://cra.org/resources/taulbee-survey/) / [NCES IPEDS](https://nces.ed.gov/ipeds/) — estimated undergraduate CS enrollment at top 20 US programs

## Deploying to Vercel

Set the **Root Directory** to `frontend/` in your Vercel project settings. No other configuration needed.
