currtime = new Date().getTime() / 1000;

function timeStampWebinar(session_time) {

    time_difference = (session_time > currtime) ? (session_time - currtime) : (currtime - session_time);
    finished = (session_time > currtime) ? false : true;
    seconds = time_difference;
    minutes = Math.round(time_difference / 60);
    hours = Math.round(time_difference / 3600);
    days = Math.round(time_difference / 86400);
    weeks = Math.round(time_difference / 604800);
    months = Math.round(time_difference / 2419200);
    years = Math.round(time_difference / 29030400);
    updatedtime = '';
    if (seconds <= 60) {
        if (finished) {
            updatedtime = seconds + " seconds ago";
        } else {
            updatedtime = "after " + seconds + "seconds";
        }
    } else if (minutes <= 60) {
        if (finished) {
            if (minutes == 1) {
                updatedtime = "one minute ago";
            } else {
                updatedtime = minutes + " minutes ago";
            }
        } else {
            if (minutes == 1) {
                updatedtime = "one minute to go";
            } else {
                updatedtime = minutes + " minutes to go";
            }
        }
    } else if (hours <= 24) {
        if (hours == 1) {
            updatedtime = "one hour ago";
        } else {
            updatedtime = hours + " hours ago";
        }
    } else if (days <= 7) {
        if (days == 1) {
            updatedtime = "one day ago";
        } else {
            updatedtime = days + " days ago";
        }
    } else if (weeks <= 4) {
        if (weeks == 1) {
            updatedtime = "one week ago";
        } else {
            updatedtime = weeks + " weeks ago";
        }
    } else if (months <= 12) {
        if (months == 1) {
            updatedtime = "one month ago";
        } else {
            updatedtime = months + " months ago";
        }
    } else {
        if (years == 1) {
            updatedtime = "one year ago";
        } else {
            updatedtime = years + " years ago";
        }
    }
    return updatedtime;
}

module.exports = {
    timeStampWebinar: timeStampWebinar
}