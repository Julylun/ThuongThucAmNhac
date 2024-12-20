// Custom plugin để hiển thị fetch code
export function fetchPlugin() {
    return {
      wrapComponents: {
        curl: (Original) => (props) => {
          const { request } = props;
          const fetchCode = `
  fetch('${request.url}', {
    method: '${request.method.toUpperCase()}',
    headers: ${JSON.stringify(request.headers, null, 2)}
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
          `;
          return (
            <div>
              <h3>Fetch Example</h3>
              <pre>{fetchCode}</pre>
              <hr />
              <h3>Curl Example</h3>
              <Original {...props} />
            </div>
          );
        },
      },
    };
  }
  