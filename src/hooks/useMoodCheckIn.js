import { useState } from "react";
import { postMoodCheckIn } from "../api/axios";

export default function useMoodCheckIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const res = await postMoodCheckIn(payload);
      return res;
    } catch (e) {
      setError(e?.message || "Unable to submit mood check-in");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, error };
}

