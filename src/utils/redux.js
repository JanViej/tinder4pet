export async function apiWrapper(
  options = {isShowSuccess: false},
  apiFunction,
  ...payload
) {
  try {
    if (options.isShowLoading) {
      // showProgress();
    }
    const response = await apiFunction(...payload);
    if (options.isShowSuccess) {
      alert('Success');
    }
    return response;
  } catch (error) {
    alert(error.message || error || 'Something wrong!');
    if (error?.code === 401) {
      // window.location = '/login';
    } else {
      //
    }

    throw error;
  }
}
