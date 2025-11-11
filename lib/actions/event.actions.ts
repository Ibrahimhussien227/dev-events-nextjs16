"use server";

import Event from "@/database/event.model";
import { IEvent } from "@/database";
import connectDB from "@/lib/mongodb";

export const getSimilarEventsBySlug = async (
  slug: string
): Promise<IEvent[]> => {
  try {
    await connectDB();
    const event = await Event.findOne({ slug });

    if (!event) {
      return [];
    }

    const similarEvents = await Event.find({
      _id: { $ne: event._id },
      tags: { $in: event.tags },
    }).lean();

    return similarEvents as unknown as IEvent[];
  } catch {
    return [];
  }
};
