function toDate(value) {
  if (value instanceof Date) {
    return value;
  }

  return new Date(value);
}

function isValidDate(date) {
  return date instanceof Date && !Number.isNaN(date.getTime());
}

export function getBookedStudentIds(session) {
  return Array.isArray(session?.bookedStudentIds) ? session.bookedStudentIds : [];
}

export function getCapacity(session) {
  const capacity = Number(session?.capacity);
  return Number.isFinite(capacity) ? capacity : 0;
}

export function applyAdvertisedSessionBookingOverrides(
  sessions = [],
  overrides = {}
) {
  return sessions.map((session) => {
    const extraStudentIds = Array.isArray(overrides[session.id])
      ? overrides[session.id]
      : [];

    return {
      ...session,
      capacity: getCapacity(session),
      bookedStudentIds: Array.from(
        new Set([...getBookedStudentIds(session), ...extraStudentIds])
      ),
    };
  });
}

export function applyBookingStatusOverrides(
  bookingsToUpdate = [],
  bookingStatusOverrides = {}
) {
  return bookingsToUpdate.map((booking) => ({
    ...booking,
    status: bookingStatusOverrides[booking.id] ?? booking.status,
  }));
}

export function isActiveStatus(status) {
  return status !== "declined" && status !== "cancelled";
}

export function isBlockingBooking(booking) {
  return isActiveStatus(booking.status);
}

export function isBlockingEvent(event) {
  return isActiveStatus(event.status);
}

export function eventsOverlap(startA, endA, startB, endB) {
  const aStart = toDate(startA);
  const aEnd = toDate(endA);
  const bStart = toDate(startB);
  const bEnd = toDate(endB);

  if (
    !isValidDate(aStart) ||
    !isValidDate(aEnd) ||
    !isValidDate(bStart) ||
    !isValidDate(bEnd)
  ) {
    return false;
  }

  return aStart < bEnd && aEnd > bStart;
}

export function hasTimeClash(event, busyEvents = []) {
  return busyEvents.some((busyEvent) =>
    eventsOverlap(
      event.startTime,
      event.endTime,
      busyEvent.startTime,
      busyEvent.endTime
    )
  );
}