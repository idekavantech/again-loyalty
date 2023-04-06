/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */

const JalaliDateConvertor = {
  gDaysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  jDaysInMonth: [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29],

  jalaliToGregorian(j_y, j_m, j_d) {
    j_y = parseInt(j_y, 10);
    j_m = parseInt(j_m, 10);
    j_d = parseInt(j_d, 10);
    const jy = j_y - 979;
    const jm = j_m - 1;
    const jd = j_d - 1;

    let j_day_no =
      365 * jy + parseInt(jy / 33, 10) * 8 + parseInt(((jy % 33) + 3) / 4, 10);
    for (let i = 0; i < jm; i += 1)
      j_day_no += JalaliDateConvertor.jDaysInMonth[i];

    j_day_no += jd;

    let g_day_no = j_day_no + 79;

    let gy =
      1600 +
      400 *
        parseInt(
          g_day_no / 146097,
          10
        ); /* 146097 = 365*400 + 400/4 - 400/100 + 400/400 */
    g_day_no %= 146097;

    let leap = true;
    if (g_day_no >= 36525) {
      /* 36525 = 365*100 + 100/4 */
      g_day_no -= 1;
      gy +=
        100 *
        parseInt(g_day_no / 36524, 10); /* 36524 = 365*100 + 100/4 - 100/100 */
      g_day_no %= 36524;

      if (g_day_no >= 365) g_day_no += 1;
      else leap = false;
    }

    gy += 4 * parseInt(g_day_no / 1461, 10); /* 1461 = 365*4 + 4/4 */
    g_day_no %= 1461;

    if (g_day_no >= 366) {
      leap = false;

      g_day_no -= 1;
      gy += parseInt(g_day_no / 365, 10);
      g_day_no %= 365;
    }
    let i;
    for (
      i = 0;
      g_day_no >= JalaliDateConvertor.gDaysInMonth[i] + (i === 1 && leap);
      i += 1
    )
      g_day_no -= JalaliDateConvertor.gDaysInMonth[i] + (i === 1 && leap);
    const gm = i + 1;
    const gd = g_day_no + 1;

    return [gy, gm, gd];
  },
  checkDate(j_y, j_m, j_d) {
    return !(
      j_y < 0 ||
      j_y > 32767 ||
      j_m < 1 ||
      j_m > 12 ||
      j_d < 1 ||
      j_d >
        JalaliDateConvertor.jDaysInMonth[j_m - 1] +
          (j_m === 12 && !(((j_y - 979) % 33) % 4))
    );
  },
  gregorianToJalali(g_y, g_m, g_d) {
    g_y = parseInt(g_y, 10);
    g_m = parseInt(g_m, 10);
    g_d = parseInt(g_d, 10);
    const gy = g_y - 1600;
    const gm = g_m - 1;
    const gd = g_d - 1;

    let g_day_no =
      365 * gy +
      parseInt((gy + 3) / 4, 10) -
      parseInt((gy + 99) / 100, 10) +
      parseInt((gy + 399) / 400, 10);

    for (let i = 0; i < gm; i += 1)
      g_day_no += JalaliDateConvertor.gDaysInMonth[i];
    if (gm > 1 && ((gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0))
      /* leap and after Feb */
      g_day_no += 1;
    g_day_no += gd;

    let j_day_no = g_day_no - 79;

    const j_np = parseInt(j_day_no / 12053, 10);
    j_day_no %= 12053;

    let jy = 979 + 33 * j_np + 4 * parseInt(j_day_no / 1461, 10);

    j_day_no %= 1461;

    if (j_day_no >= 366) {
      jy += parseInt((j_day_no - 1) / 365, 10);
      j_day_no = (j_day_no - 1) % 365;
    }
    let i;
    for (
      i = 0;
      i < 11 && j_day_no >= JalaliDateConvertor.jDaysInMonth[i];
      i += 1
    ) {
      j_day_no -= JalaliDateConvertor.jDaysInMonth[i];
    }
    const jm = i + 1;
    const jd = j_day_no + 1;

    return [jy, jm, jd];
  },
};

class JalaliDate extends Date {
  setJalaliFullYear(y, m, d) {
    const gd = this.getDate();
    const gm = this.getMonth();
    const gy = this.getFullYear();
    const j = JalaliDateConvertor.gregorianToJalali(gy, gm + 1, gd);
    if (y < 100) y += 1300;
    j[0] = y;
    if (m !== undefined) {
      if (m > 11) {
        j[0] += Math.floor(m / 12);
        m %= 12;
      }
      j[1] = m + 1;
    }
    if (d !== undefined) j[2] = d;
    const g = JalaliDateConvertor.jalaliToGregorian(j[0], j[1], j[2]);
    return this.setFullYear(g[0], g[1] - 1, g[2]);
  }

  setJalaliMonth(m, d) {
    const gd = this.getDate();
    const gm = this.getMonth();
    const gy = this.getFullYear();
    const j = JalaliDateConvertor.gregorianToJalali(gy, gm + 1, gd);
    if (m > 11) {
      j[0] += Math.floor(m / 12);
      m %= 12;
    }
    j[1] = m + 1;
    if (d !== undefined) j[2] = d;
    const g = JalaliDateConvertor.jalaliToGregorian(j[0], j[1], j[2]);
    return this.setFullYear(g[0], g[1] - 1, g[2]);
  }

  setJalaliDate(d) {
    const gd = this.getDate();
    const gm = this.getMonth();
    const gy = this.getFullYear();
    const j = JalaliDateConvertor.gregorianToJalali(gy, gm + 1, gd);
    j[2] = d;
    const g = JalaliDateConvertor.jalaliToGregorian(j[0], j[1], j[2]);
    return this.setFullYear(g[0], g[1] - 1, g[2]);
  }

  getJalaliFullYear() {
    const gd = this.getDate();
    const gm = this.getMonth();
    const gy = this.getFullYear();
    const j = JalaliDateConvertor.gregorianToJalali(gy, gm + 1, gd);
    return j[0];
  }

  getJalaliMonth() {
    const gd = this.getDate();
    const gm = this.getMonth();
    const gy = this.getFullYear();
    const j = JalaliDateConvertor.gregorianToJalali(gy, gm + 1, gd);
    return j[1] - 1;
  }

  getJalaliDate() {
    const gd = this.getDate();
    const gm = this.getMonth();
    const gy = this.getFullYear();
    const j = JalaliDateConvertor.gregorianToJalali(gy, gm + 1, gd);
    return j[2];
  }

  getJalaliDay() {
    let day = this.getDay();
    day = (day + 1) % 7;
    return day;
  }

  setJalaliUTCFullYear(y, m, d) {
    const gd = this.getUTCDate();
    const gm = this.getUTCMonth();
    const gy = this.getUTCFullYear();
    const j = JalaliDateConvertor.gregorianToJalali(gy, gm + 1, gd);
    if (y < 100) y += 1300;
    j[0] = y;
    if (m !== undefined) {
      if (m > 11) {
        j[0] += Math.floor(m / 12);
        m %= 12;
      }
      j[1] = m + 1;
    }
    if (d !== undefined) j[2] = d;
    const g = JalaliDateConvertor.jalaliToGregorian(j[0], j[1], j[2]);
    return this.setUTCFullYear(g[0], g[1] - 1, g[2]);
  }

  setJalaliUTCMonth(m, d) {
    const gd = this.getUTCDate();
    const gm = this.getUTCMonth();
    const gy = this.getUTCFullYear();
    const j = JalaliDateConvertor.gregorianToJalali(gy, gm + 1, gd);
    if (m > 11) {
      j[0] += Math.floor(m / 12);
      m %= 12;
    }
    j[1] = m + 1;
    if (d !== undefined) j[2] = d;
    const g = JalaliDateConvertor.jalaliToGregorian(j[0], j[1], j[2]);
    return this.setUTCFullYear(g[0], g[1] - 1, g[2]);
  }

  setJalaliUTCDate(d) {
    const gd = this.getUTCDate();
    const gm = this.getUTCMonth();
    const gy = this.getUTCFullYear();
    const j = JalaliDateConvertor.gregorianToJalali(gy, gm + 1, gd);
    j[2] = d;
    const g = JalaliDateConvertor.jalaliToGregorian(j[0], j[1], j[2]);
    return this.setUTCFullYear(g[0], g[1] - 1, g[2]);
  }

  getJalaliUTCFullYear() {
    const gd = this.getUTCDate();
    const gm = this.getUTCMonth();
    const gy = this.getUTCFullYear();
    const j = JalaliDateConvertor.gregorianToJalali(gy, gm + 1, gd);
    return j[0];
  }

  getJalaliUTCMonth() {
    const gd = this.getUTCDate();
    const gm = this.getUTCMonth();
    const gy = this.getUTCFullYear();
    const j = JalaliDateConvertor.gregorianToJalali(gy, gm + 1, gd);
    return j[1] - 1;
  }

  getJalaliUTCDate() {
    const gd = this.getUTCDate();
    const gm = this.getUTCMonth();
    const gy = this.getUTCFullYear();
    const j = JalaliDateConvertor.gregorianToJalali(gy, gm + 1, gd);
    return j[2];
  }

  getJalaliUTCDay() {
    let day = this.getUTCDay();
    day = (day + 1) % 7;
    return day;
  }
}

export default JalaliDate;
