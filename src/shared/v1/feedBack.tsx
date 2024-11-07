import { useState } from "react";
import { submitFeedback } from "@/services/actions/user.actions";
import { getAccessTokenObj } from "@/services/helpers/init.helper";
import { notify } from "@/(layout)/v1/ToasterComponent";

export default function Feedback({lang}:any) {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleRatingClick = (value: any) => {
    setRating(value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (rating === 0 || message.trim() === "") {
        notify(lang?.feedback_mandatory, "error");
        return;
      }

      const payload = {
        rating: rating,
        feedback: message,
      };
      let response = await submitFeedback(payload, getAccessTokenObj());
      if (response.result.success) {
        notify(lang?.thanks_feedback, "success");
      } else {
        notify(response.result.reason, "error");
      }

      setRating(0);
      setMessage("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex flex-col ">
      <div className="flex  mb-4">
        {[1, 2, 3, 4, 5].map((index) => (
          <svg
            key={index}
            xmlns="http://www.w3.org/2000/svg"
            className={`h-12 w-12 fill-current ${
              index <= rating ? "text-pink-600" : "text-primaryItemColor"
            } cursor-pointer`}
            viewBox="0 0 20 20"
            onClick={() => handleRatingClick(index)}
          >
            <path
              fillRule="evenodd"
              d="M10 2.304l1.29 3.95h4.17l-3.385 2.46 1.29 3.95-3.384-2.46-3.386 2.46 1.29-3.95-3.385-2.46h4.17l1.29-3.95z"
            />
          </svg>
        ))}


      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-footerbordercolor dark:text-primaryColor"
          >
            <div className="text-primaryColor"> {lang?.rate_your_experience} </div>
          </label>
          <textarea
            id="message"
            rows={4}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="block p-2.5 w-full text-sm text-footerbordercolor bg-primaryItemColor rounded-lg border border-secondaryItemColor focus:ring-primaryfeedbackRingColor focus:border-primaryfeedbackRingColor dark:bg-detailsbordercolor dark:border-detailsbordercolor dark:placeholder-secondaryItemColor dark:text-primaryColor dark:focus:ring-primaryfeedbackRingColor dark:focus:border-primaryfeedbackRingColor"
            placeholder={lang?.tell_us_improved}
          />
        </div>
        <button
          type="submit"
          className="bg-selectedBGPrimaryColor text-primaryColor px-4 py-2 rounded-md hover:bg-[#BA0B5D] text-[0.8rem]"
          disabled={isSubmitting}
        >
          {isSubmitting ? lang?.Submitting_Feedback : lang?.submit}
        </button>
      </form>

      {error && <div className="text-primaryErrorColor">{error}</div>}
    </section>
  );
}
