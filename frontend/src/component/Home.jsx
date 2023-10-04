import React from "react";
import UsersLineChart from "./UsersLineChart";

function Home() {
  return (
    <div class="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div class="mx-auto  max-w-4xl lg:mx-0 lg:max-w-none  lg:items-start ">
        <div class=" lg:mx-auto lg:w-full lg:max-w-7xl lg:px-8">
          <div class="lg:pr-4">
            <div class="">
              <UsersLineChart className="chart" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
