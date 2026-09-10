import "./StatCard.css";

function StatCard({ image, title, value }) {
    return (
        <div className="stat-card">

            <img
                src={image}
                alt={title}
                className="stat-card-image"
            />

            <p className="stat-card-title">
                {title}
            </p>

            <h2 className="stat-card-value">
                {value}
            </h2>

        </div>
    );
}

export default StatCard;