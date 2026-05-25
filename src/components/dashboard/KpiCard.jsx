import { motion } from "framer-motion"

export default function KpiCard({
  title,
  value,
  variation,
  tone,
}) {
  const positive =
    tone === "positive" ||
    (!tone && variation.includes("+"))

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="
      bg-white
      dark:bg-slate-900
      rounded-2xl
      shadow-sm
      p-5
      border
      dark:border-slate-700
    "
    >
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h2 className="text-3xl font-bold mt-2">
        {value}
      </h2>

      <span
        className={`
        text-sm
        mt-3
        inline-block
        ${
          positive
            ? "text-emerald-500"
            : "text-red-500"
        }
      `}
      >
        {variation}
      </span>
    </motion.div>
  )
}
