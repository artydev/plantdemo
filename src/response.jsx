import React from "react";
import { render } from "react-dom";

export function renderResponse(el, res) {
  render(<ResponseView res={res} />, el);
}

function ResponseView({ res }) {
  return (
    <div className="flex flex-col h-full p-5">
      <Notice />
      <h2 className="font-normal text-xl my-3">Response</h2>
      <div>
        <table className="text-left border text-sm font-normal my-2">
          <thead>
            <tr>
              <th className="p-2 font-semibold text-gray-700 p-2 bg-gray-100">
                Status
              </th>
              <th className="p-2 font-semibold text-gray-700 p-2 bg-gray-100">
                Status Text
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-mono p-2 border-t text-blue-700">
                {res.status}
              </td>
              <td className="font-mono p-2 border-t text-blue-700">
                {res.statusText}
              </td>
            </tr>
          </tbody>
        </table>
        <table className="text-left text-sm border rounded my-2">
          <thead>
            <tr>
              <th className="p-2 font-semibold text-gray-700 p-2 bg-gray-100">
                Header
              </th>
              <th className="p-2 font-semibold text-gray-700 p-2 bg-gray-100">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from(res.headers.entries()).map(([header, value], i) => (
              <tr key={i}>
                <td className="font-mono p-2 border-t text-purple-700">
                  {header}
                </td>
                <td className="font-mono p-2 border-t text-blue-700">
                  {value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2 className="font-normal text-xl my-3">Body</h2>
      <ResponseContent type={res.headers.get("content-type")} body={res.body} />
    </div>
  );
}

function ResponseContent({ type, body }) {
  if (type === "text/html") {
    return (
      <iframe
        title="Response body rendering"
        srcDoc={body}
        className="rounded border border-gray-300 shadow-lg flex-grow"
      />
    );
  } else {
    return (
      <pre className="rounded border text-sm border-gray-300 shadow-lg flex-grow p-5">
        {body}
      </pre>
    );
  }
}

function Notice() {
  if (window.top !== window) {
    return (
      <div
        className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
        role="alert"
      >
        <p className="font-bold">Preview mode required</p>
        <p>
          Open this preview in new window (watch above) to make links in the
          body section work.
        </p>
      </div>
    );
  } else {
    return null;
  }
}
