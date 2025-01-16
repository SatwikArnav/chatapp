import React from 'react';

const AnimatedBike = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-[hsl(223,90%,90%)] dark:bg-[hsl(223,90%,10%)] text-[hsl(223,90%,10%)] dark:text-[hsl(223,90%,90%)]">
      <svg
        className="w-64 h-auto block m-auto"
        viewBox="0 0 48 30"
        style={{
          '--primary': 'hsl(223,90%,50%)',
          '--trans-dur': '0.3s',
        }}
      >
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
        >
          <g transform="translate(9.5,19)">
            <circle
              className="animate-[bikeTire_3s_ease-in-out_infinite]"
              r="9"
              strokeDasharray="56.549 56.549"
            />
            <g
              className="animate-[bikeSpokesSpin_3s_linear_infinite]"
              strokeDasharray="31.416 31.416"
              strokeDashoffset="-23.562"
            >
              <circle
                className="animate-[bikeSpokes_3s_ease-in-out_infinite] stroke-current"
                r="5"
              />
              <circle
                className="animate-[bikeSpokes_3s_ease-in-out_infinite] stroke-current"
                r="5"
                transform="rotate(180,0,0)"
              />
            </g>
          </g>
          <g transform="translate(24,19)">
            <g
              className="animate-[bikePedalsSpin_3s_linear_infinite]"
              strokeDasharray="25.133 25.133"
              strokeDashoffset="-21.991"
              transform="rotate(67.5,0,0)"
            >
              <circle
                className="animate-[bikePedals_3s_ease-in-out_infinite] stroke-[var(--primary)]"
                r="4"
              />
              <circle
                className="animate-[bikePedals_3s_ease-in-out_infinite] stroke-[var(--primary)]"
                r="4"
                transform="rotate(180,0,0)"
              />
            </g>
          </g>
          <g transform="translate(38.5,19)">
            <circle
              className="animate-[bikeTire_3s_ease-in-out_infinite]"
              r="9"
              strokeDasharray="56.549 56.549"
            />
            <g
              className="animate-[bikeSpokesSpin_3s_linear_infinite]"
              strokeDasharray="31.416 31.416"
              strokeDashoffset="-23.562"
            >
              <circle
                className="animate-[bikeSpokes_3s_ease-in-out_infinite] stroke-current"
                r="5"
              />
              <circle
                className="animate-[bikeSpokes_3s_ease-in-out_infinite] stroke-current"
                r="5"
                transform="rotate(180,0,0)"
              />
            </g>
          </g>
          <polyline
            className="animate-[bikeSeat_3s_ease-in-out_infinite] stroke-[var(--primary)]"
            points="14 3,18 3"
            strokeDasharray="5 5"
          />
          <polyline
            className="animate-[bikeBody_3s_ease-in-out_infinite] stroke-[var(--primary)]"
            points="16 3,24 19,9.5 19,18 8,34 7,24 19"
            strokeDasharray="79 79"
          />
          <path
            className="animate-[bikeHandlebars_3s_ease-in-out_infinite] stroke-[var(--primary)]"
            d="m30,2h6s1,0,1,1-1,1-1,1"
            strokeDasharray="10 10"
          />
          <polyline
            className="animate-[bikeFront_3s_ease-in-out_infinite] stroke-[var(--primary)]"
            points="32.5 2,38.5 19"
            strokeDasharray="19 19"
          />
        </g>
      </svg>

      <style jsx>{`
        @keyframes bikeBody {
          from { stroke-dashoffset: 79; }
          33%, 67% { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -79; }
        }
        @keyframes bikeFront {
          from { stroke-dashoffset: 19; }
          33%, 67% { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -19; }
        }
        @keyframes bikeHandlebars {
          from { stroke-dashoffset: 10; }
          33%, 67% { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -10; }
        }
        @keyframes bikePedals {
          from {
            animation-timing-function: ease-in;
            stroke-dashoffset: -25.133;
          }
          33%, 67% {
            animation-timing-function: ease-out;
            stroke-dashoffset: -21.991;
          }
          to {
            stroke-dashoffset: -25.133;
          }
        }
        @keyframes bikePedalsSpin {
          from { transform: rotate(0.1875turn); }
          to { transform: rotate(3.1875turn); }
        }
        @keyframes bikeSeat {
          from { stroke-dashoffset: 5; }
          33%, 67% { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -5; }
        }
        @keyframes bikeSpokes {
          from {
            animation-timing-function: ease-in;
            stroke-dashoffset: -31.416;
          }
          33%, 67% {
            animation-timing-function: ease-out;
            stroke-dashoffset: -23.562;
          }
          to {
            stroke-dashoffset: -31.416;
          }
        }
        @keyframes bikeSpokesSpin {
          from { transform: rotate(0); }
          to { transform: rotate(3turn); }
        }
        @keyframes bikeTire {
          from {
            animation-timing-function: ease-in;
            stroke-dashoffset: 56.549;
            transform: rotate(0);
          }
          33% {
            stroke-dashoffset: 0;
            transform: rotate(0.33turn);
          }
          67% {
            animation-timing-function: ease-out;
            stroke-dashoffset: 0;
            transform: rotate(0.67turn);
          }
          to {
            stroke-dashoffset: -56.549;
            transform: rotate(1turn);
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedBike;