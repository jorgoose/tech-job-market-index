"""
Overlay visualization: FRED Software Development Job Postings (Indeed)
vs. Top 20 US University CS Enrollment.

Data sources:
- FRED series IHLIDXUSTPSOFTDEVE: Software Development Job Postings on
  Indeed in the United States (Index, Feb 1 2020 = 100, Seasonally Adjusted)
  https://fred.stlouisfed.org/series/IHLIDXUSTPSOFTDEVE
- CS enrollment estimates for top 20 US CS programs compiled from
  NCES IPEDS completions data and CRA Taulbee Survey reports.
  https://cra.org/resources/taulbee-survey/
  https://nces.ed.gov/ipeds/
"""

import pathlib

import matplotlib.pyplot as plt
import matplotlib.dates as mdates
import matplotlib.ticker as mticker
import numpy as np
import pandas as pd

DATA_DIR = pathlib.Path(__file__).parent / "data"
OUTPUT_DIR = pathlib.Path(__file__).parent / "output"


def load_fred_data() -> pd.DataFrame:
    """Load FRED software job postings index (monthly)."""
    df = pd.read_csv(DATA_DIR / "fred_software_jobs.csv", parse_dates=["date"])
    return df


def load_enrollment_data() -> pd.DataFrame:
    """Load top-20 university CS enrollment and compute yearly totals."""
    df = pd.read_csv(DATA_DIR / "top20_cs_enrollment.csv")
    year_cols = [c for c in df.columns if c != "university"]
    totals = df[year_cols].sum()
    enrollment = pd.DataFrame(
        {"year": [int(y) for y in totals.index], "total_enrollment": totals.values}
    )
    return enrollment


def interpolate_enrollment_monthly(enrollment: pd.DataFrame) -> pd.DataFrame:
    """Interpolate annual enrollment data to monthly for overlay alignment.

    Each academic year's enrollment is anchored to September (fall semester).
    Values are linearly interpolated between anchor points.
    """
    rows = []
    for _, row in enrollment.iterrows():
        rows.append(
            {"date": pd.Timestamp(year=int(row["year"]), month=9, day=1),
             "enrollment": row["total_enrollment"]}
        )
    monthly = pd.DataFrame(rows).set_index("date")
    # Resample to monthly and interpolate
    monthly = monthly.resample("MS").asfreq()
    monthly["enrollment"] = monthly["enrollment"].interpolate(method="linear")
    return monthly.reset_index()


def create_visualization():
    fred = load_fred_data()
    enrollment_yearly = load_enrollment_data()
    enrollment_monthly = interpolate_enrollment_monthly(enrollment_yearly)

    # --- Style ---
    plt.rcParams.update({
        "font.family": "sans-serif",
        "font.size": 11,
        "axes.spines.top": False,
    })

    fig, ax1 = plt.subplots(figsize=(14, 7))

    # Colors
    job_color = "#E63946"  # red for job postings
    enroll_color = "#457B9D"  # blue for enrollment

    # --- Left axis: FRED Software Job Postings Index ---
    ax1.plot(
        fred["date"],
        fred["index_value"],
        color=job_color,
        linewidth=2.2,
        label="Software Dev Job Postings (Indeed/FRED)",
        zorder=3,
    )
    ax1.fill_between(
        fred["date"],
        fred["index_value"],
        alpha=0.10,
        color=job_color,
        zorder=2,
    )
    ax1.set_ylabel(
        "Job Postings Index\n(Feb 2020 = 100, Seasonally Adj.)",
        color=job_color,
        fontsize=12,
        fontweight="bold",
    )
    ax1.tick_params(axis="y", labelcolor=job_color)
    ax1.set_ylim(0, 260)

    # Annotate peak and current
    peak_idx = fred["index_value"].idxmax()
    peak_date = fred.loc[peak_idx, "date"]
    peak_val = fred.loc[peak_idx, "index_value"]
    ax1.annotate(
        f"Peak: {peak_val:.0f}",
        xy=(peak_date, peak_val),
        xytext=(peak_date + pd.Timedelta(days=60), peak_val + 15),
        fontsize=9,
        color=job_color,
        fontweight="bold",
        arrowprops=dict(arrowstyle="->", color=job_color, lw=1.2),
    )

    latest_date = fred["date"].iloc[-1]
    latest_val = fred["index_value"].iloc[-1]
    ax1.annotate(
        f"Latest: {latest_val:.1f}",
        xy=(latest_date, latest_val),
        xytext=(latest_date - pd.Timedelta(days=180), latest_val + 35),
        fontsize=9,
        color=job_color,
        fontweight="bold",
        arrowprops=dict(arrowstyle="->", color=job_color, lw=1.2),
    )

    # Baseline reference line
    ax1.axhline(y=100, color=job_color, linestyle="--", alpha=0.3, linewidth=1)
    ax1.text(
        fred["date"].iloc[0] + pd.Timedelta(days=10),
        103,
        "Pre-pandemic baseline (100)",
        fontsize=8,
        color=job_color,
        alpha=0.6,
    )

    # --- Right axis: CS Enrollment ---
    ax2 = ax1.twinx()

    # Filter enrollment to the FRED date range
    mask = (enrollment_monthly["date"] >= fred["date"].min()) & (
        enrollment_monthly["date"] <= fred["date"].max()
    )
    enroll_plot = enrollment_monthly[mask]

    ax2.plot(
        enroll_plot["date"],
        enroll_plot["enrollment"],
        color=enroll_color,
        linewidth=2.2,
        linestyle="-",
        label="Top 20 CS Programs — Total Enrollment",
        zorder=3,
    )
    ax2.fill_between(
        enroll_plot["date"],
        enroll_plot["enrollment"],
        alpha=0.08,
        color=enroll_color,
        zorder=2,
    )
    ax2.set_ylabel(
        "CS Enrollment (Top 20 Universities)",
        color=enroll_color,
        fontsize=12,
        fontweight="bold",
    )
    ax2.tick_params(axis="y", labelcolor=enroll_color)
    ax2.yaxis.set_major_formatter(mticker.FuncFormatter(lambda x, _: f"{x:,.0f}"))

    # Also scatter the actual annual data points
    for _, row in enrollment_yearly.iterrows():
        yr = int(row["year"])
        anchor = pd.Timestamp(year=yr, month=9, day=1)
        if fred["date"].min() <= anchor <= fred["date"].max():
            ax2.scatter(
                anchor,
                row["total_enrollment"],
                color=enroll_color,
                s=50,
                zorder=5,
                edgecolors="white",
                linewidths=1,
            )

    # --- X-axis formatting ---
    ax1.xaxis.set_major_locator(mdates.MonthLocator(bymonth=[1, 7]))
    ax1.xaxis.set_major_formatter(mdates.DateFormatter("%b\n%Y"))
    ax1.tick_params(axis="x", rotation=0)
    ax1.set_xlim(fred["date"].min() - pd.Timedelta(days=15),
                 fred["date"].max() + pd.Timedelta(days=15))

    # --- Grid ---
    ax1.grid(axis="y", alpha=0.2, linewidth=0.5)
    ax1.grid(axis="x", alpha=0.15, linewidth=0.5)

    # --- Title ---
    fig.suptitle(
        "Software Job Postings vs. CS University Enrollment",
        fontsize=16,
        fontweight="bold",
        y=0.97,
    )
    ax1.set_title(
        "FRED IHLIDXUSTPSOFTDEVE (Indeed) overlaid with Top 20 US CS Program Enrollment",
        fontsize=10,
        color="gray",
        pad=10,
    )

    # --- Combined legend ---
    lines1, labels1 = ax1.get_legend_handles_labels()
    lines2, labels2 = ax2.get_legend_handles_labels()
    ax1.legend(
        lines1 + lines2,
        labels1 + labels2,
        loc="upper left",
        framealpha=0.9,
        fontsize=10,
    )

    # --- Footer / source note ---
    fig.text(
        0.5,
        0.01,
        "Sources: FRED/Indeed (IHLIDXUSTPSOFTDEVE) | NCES IPEDS & CRA Taulbee Survey (enrollment estimates)\n"
        "Note: Job postings index is seasonally adjusted, Feb 2020 = 100. "
        "Enrollment data interpolated monthly from fall-semester anchors.",
        ha="center",
        fontsize=8,
        color="gray",
        style="italic",
    )

    plt.tight_layout(rect=[0, 0.04, 1, 0.95])

    OUTPUT_DIR.mkdir(exist_ok=True)
    out_path = OUTPUT_DIR / "jobs_vs_enrollment.png"
    fig.savefig(out_path, dpi=200, bbox_inches="tight", facecolor="white")
    print(f"Saved: {out_path}")
    plt.close(fig)
    return out_path


if __name__ == "__main__":
    create_visualization()
