export const formatDescription = str => {
  if (str.length > 200) {
    return str.substr(0, 200).concat("...")
  } else {
    return str
  }
}

export const sortByNPM = (a, b) => {
  const aNPM = a.npm_download_since_last_month
    ? a.npm_download_since_last_month
    : 0
  const bNPM = b.npm_download_since_last_month
    ? b.npm_download_since_last_month
    : 0

  return bNPM - aNPM
}

const sortByGithub = (a, b) => {
  return b["github_star"] - a["github_star"]
}

export const sortByDefault = (a, b) => {
  const aSortValue =
    a.npm_download_since_last_month > a.github_star
      ? a.npm_download_since_last_month
      : a.github_star || 0

  const bSortValue =
    b.npm_download_since_last_month > b.github_star
      ? b.npm_download_since_last_month
      : b.github_star || 0

  if (bSortValue > aSortValue) {
    return 1
  } else if (bSortValue < aSortValue) {
    return -1
  }

  return 0
}
