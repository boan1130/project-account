const API_URL = 'http://localhost:2083/'; // 修改成您的後端 API 位置


/**
 * 異步呼叫api, 只可用響應體為 json 的 api
 * @param api 要呼叫的api
 * @returns json 結果
 */
export async function asyncGet(api: string):Promise<any>{
  try {
      const res: Response = await fetch(api)
      try {
          return await res.json()
      } catch (error) {
          return error
      }
  } catch (error) {
      return error
  }
}

export async function asyncPost(api: string, body: {} | FormData) {
  const res: Response = await fetch(api, {
      method: 'POST',
   
      headers:new Headers({
          'Access-Control-Allow-Origin':"http://localhost:5173/",
          'content-Type':"application/json"
      }),
      body: body instanceof FormData?body:JSON.stringify(body),
      mode:"cors"
  })
  try {
      let data = res.json()
      return data
  } catch (error) {
      console.error(error)
  }
}

export async function asyncPut(api: string, body: {} | FormData) {
  const res: Response = await fetch(api, {
      method: 'PUT',
      headers:new Headers({
          'Access-Control-Allow-Origin':"http://localhost:5173/",
          'content-Type':"application/json"
      }),
      body: body instanceof FormData?body:JSON.stringify(body),
      mode:"cors"
  })
  try {
      let data = res.json()
      return data
  } catch (error) {
      console.error(error)
  }
}

export async function asyncDelete<T>(api: string): Promise<T> {
    try {
      const res: Response = await fetch(api, {
        method: 'DELETE',
        headers: new Headers({
          'Content-Type': 'application/json', // 保留標準的 Content-Type
        }),
        mode: 'cors',
      });
  
      // 檢查 HTTP 狀態碼
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({})); // 捕捉後端返回的錯誤訊息
        const errorMessage = errorData.message || `HTTP error! status: ${res.status} - ${res.statusText}`;
        throw new Error(errorMessage);
      }
  
      // 返回解析後的 JSON 數據
      const data: T = await res.json();
      return data;
    } catch (error) {
      console.error('Error in asyncDelete:', error);
      throw error; // 將錯誤拋出，讓呼叫者進一步處理
    }
  }
  